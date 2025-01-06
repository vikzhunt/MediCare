import numpy as np
import pandas as pd
import re
import joblib
from sklearn.tree import _tree
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

base_dir = os.path.dirname(os.path.abspath(__file__))

data = pd.read_csv(os.path.join(base_dir, 'Training.csv'))
cols = data.columns[:-1]
global reduced_data
reduced_data = data.groupby(data['prognosis']).max()

dclf = joblib.load(os.path.join(base_dir, 'model.pkl'))
le = joblib.load(os.path.join(base_dir, 'label_encoder.pkl'))
features = joblib.load(os.path.join(base_dir, 'features.pkl'))
severityDictionary = joblib.load(os.path.join(base_dir, 'severity_dict.pkl'))
description_list = joblib.load(os.path.join(base_dir, 'description_list.pkl'))
precautionDictionary = joblib.load(os.path.join(base_dir, 'precaution_dict.pkl'))

symptoms_dict = {symptom: index for index, symptom in enumerate(features)}

def calc_condition(exp, days):
    sum = 0
    for item in exp:
        sum += severityDictionary[item]
    if (sum * days) / (len(exp) + 1) > 13:
        return "You should take the consultation from doctor."
    else:
        return "It might not be that bad but you should take precautions."

def sec_predict(symptoms_exp):
    input = np.zeros(len(symptoms_dict))
    for item in symptoms_exp:
        input[symptoms_dict[item]] = 1
    print(f"Model input: {input}")
    prediction = dclf.predict(pd.DataFrame([input], columns=cols))
    print(f"Model output: {prediction}")
    return prediction

def print_disease(node):
    n = node[0]
    val = np.atleast_1d(n).nonzero()
    disease = le.inverse_transform(val[0])
    return list(map(lambda x: x.strip(), list(disease)))

@app.route('/greet', methods=['POST'])
def greet():
    data = request.json
    name = data.get('name', '')
    
    if not name:
        return jsonify({"error": "No name provided"}), 400
    
    response = {
        "message": f"Hello {name}! How can I assist you today? Please enter your symptoms."
    }
    
    return jsonify(response)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get('symptoms', [])
    days = data.get('days', 0)
    
    print("Received data:", data)
    print("Received symptoms:", symptoms)
    print("Available symptoms:", list(symptoms_dict.keys()))
    
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400
    
    try:
        prediction = sec_predict(symptoms)
        prediction = print_disease(np.array(prediction))
        condition_message = calc_condition(symptoms, days)
        
        red_cols = reduced_data.columns
        symptoms_given = red_cols[reduced_data.loc[prediction].values[0].nonzero()]
        follow_up_questions = [f"Are you experiencing {symptom}?" for symptom in symptoms_given]
        
        response = {
            "predicted_disease": prediction[0],
            "description": description_list[prediction[0]],
            "precautions": precautionDictionary[prediction[0]],
            "follow_up_questions": follow_up_questions,
            "condition_message": condition_message
        }
        
        return jsonify(response)
    except KeyError as e:
        print(f"Error: Symptom '{e.args[0]}' not found in the model")
        return jsonify({"error": f"Symptom '{e.args[0]}' not found in the model"}), 400
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@app.route('/finalize', methods=['POST'])
def finalize():
    data = request.json
    symptoms = data.get('symptoms', [])
    days = data.get('days', 0)
    follow_up_answers = data.get('follow_up_answers', [])
    
    print("Received data:", data)
    print("Received symptoms:", symptoms)
    print("Follow-up answers:", follow_up_answers)
    
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400
    
    try:
        symptoms_exp = [symptom for symptom, answer in zip(symptoms, follow_up_answers) if answer]
        final_prediction = sec_predict(symptoms_exp)
        final_prediction = print_disease(np.array(final_prediction))
        condition_message = calc_condition(symptoms_exp, days)
        
        response = {
            "predicted_disease": final_prediction[0],
            "description": description_list[final_prediction[0]],
            "precautions": precautionDictionary[final_prediction[0]],
            "condition_message": condition_message
        }
        
        return jsonify(response)
    except KeyError as e:
        print(f"Error: Symptom '{e.args[0]}' not found in the model")
        return jsonify({"error": f"Symptom '{e.args[0]}' not found in the model"}), 400
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
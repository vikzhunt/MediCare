import numpy as np
import pandas as pd
import re
import joblib
from sklearn.tree import _tree

data = pd.read_csv('Training.csv')
cols = data.columns[:-1]
global reduced_data
reduced_data = data.groupby(data['prognosis']).max()

dclf = joblib.load('model.pkl')
le = joblib.load('label_encoder.pkl')
features = joblib.load('features.pkl')
severityDictionary = joblib.load('severity_dict.pkl')
description_list = joblib.load('description_list.pkl')
precautionDictionary = joblib.load('precaution_dict.pkl')

symptoms_dict = {symptom: index for index, symptom in enumerate(features)}

def calc_condition(exp,days):
    sum=0
    for item in exp:
         sum=sum+severityDictionary[item]
    if((sum*days)/(len(exp)+1)>13):
        print("You should take the consultation from doctor. ")
    else:
        print("It might not be that bad but you should take precautions.")

def sec_predict(symptoms_exp):
    input = np.zeros(len(symptoms_dict))
    for item in symptoms_exp:
        input[symptoms_dict[item]] = 1
    return dclf.predict(pd.DataFrame([input], columns=cols))

def print_disease(node):
    n = node[0]
    val = np.atleast_1d(n).nonzero()
    disease = le.inverse_transform(val[0])
    return list(map(lambda x:x.strip(),list(disease)))

def check_pattern(dis_list, inp):
    inp = inp.replace(' ', '_')
    patt = f"{inp}"
    regexp = re.compile(patt)
    pred_list = [item for item in dis_list if regexp.search(item)]
    return (1, pred_list) if pred_list else (0, [])

def tree_to_code(tree, feature_names):
    tree_ = tree.tree_
    feature_name = [
        feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
        for i in tree_.feature
    ]
    chk_dis = ",".join(feature_names).split(",")
    symptoms_present = []

    while True:
        symptom_input = input("\nEnter the symptom you are experiencing: ").strip()
        conf, cnf_dis = check_pattern(chk_dis, symptom_input)
        if conf:
            print("\nSearches related to input symptom: ")
            for num, it in enumerate(cnf_dis):
                print(f"{num}) {it}")
            if num > 0:
                symptom_input = cnf_dis[int(input(f"Select the one you meant (0 - {num}): "))]
            else:
                symptom_input = cnf_dis[0]
            break
        else:
            print("Enter a valid symptom.")

    while True:
        try:
            num_days = int(input("\nHow many days have you been experiencing this? "))
            break
        except ValueError:
            print("Enter a valid number.")

    def recurse(node, depth):
        if tree_.feature[node] != _tree.TREE_UNDEFINED:
            name = feature_name[node]
            threshold = tree_.threshold[node]

            if name == symptom_input:
                val = 1
            else:
                val = 0
            if val <= threshold:
                recurse(tree_.children_left[node], depth + 1)
            else:
                symptoms_present.append(name)
                recurse(tree_.children_right[node], depth + 1)
        else:
            present_disease = print_disease(tree_.value[node])
            red_cols = reduced_data.columns
            symptoms_given = red_cols[reduced_data.loc[present_disease].values[0].nonzero()]



            print("Are you experiencing any ")
            symptoms_exp=[]
            for syms in list(symptoms_given):
                inp=""
                print(syms,"? : ",end='')
                while True:
                    inp=input("")
                    if(inp=="yes" or inp=="no"):
                        break
                    else:
                        print("provide proper answers i.e. (yes/no) : ",end="")
                if(inp=="yes"):
                    symptoms_exp.append(syms)

            second_prediction=sec_predict(symptoms_exp)
            second_prediction = print_disease(np.array(second_prediction));
            calc_condition(symptoms_exp,num_days)
            if(present_disease[0]==second_prediction[0]):
                print("You may have ", present_disease[0])
                print(description_list[present_disease[0]])
            else:
                print("You may have ", present_disease[0], "or ", second_prediction[0])
                print(description_list[present_disease[0]])
                print(description_list[second_prediction[0]])

            precution_list=precautionDictionary[present_disease[0]]
            print("Take following measures : ")
            for  i,j in enumerate(precution_list):
                print(i+1,")",j)

    recurse(0,1)

print("----------------------------------------------------------------------------------------")
print("                                   Disease Prediction                                   ")
print("----------------------------------------------------------------------------------------")
name = input("Your Name: ")
print(f"Hello {name}!")
tree_to_code(dclf, cols)
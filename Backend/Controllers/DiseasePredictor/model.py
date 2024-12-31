import numpy as np
import pandas as pd
from sklearn import preprocessing
from sklearn.tree import DecisionTreeClassifier
import csv
import joblib
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)

data = pd.read_csv('Training.csv')

cols = data.columns[:-1]
x = data[cols]
y = data['prognosis']

le = preprocessing.LabelEncoder()
le.fit(y)
y = le.transform(y)

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)

dclf = DecisionTreeClassifier().fit(x_train, y_train)

joblib.dump(dclf, 'model.pkl')
joblib.dump(le, 'label_encoder.pkl')  
joblib.dump(list(cols), 'features.pkl')  

severityDictionary = {}
with open('Symptom_severity.csv') as f:
        data = csv.reader(f, delimiter=',')
        for row in data:
            if len(row) >= 2:
                try:
                    severityDictionary[row[0]] = int(row[1])
                except ValueError:
                    print(f"Warning: Couldn't convert '{row[1]}' to an integer for symptom '{row[0]}'. Skipping it.")
            else:
                print(f"Warning: Row '{row}' has less than two elements. Skipping it.")

joblib.dump(severityDictionary, 'severity_dict.pkl')


description_list = {}
with open('symptom_Description.csv') as f:
    data = csv.reader(f, delimiter=',')
    for row in data:
        description_list[row[0]] = row[1]

joblib.dump(description_list, 'description_list.pkl')  


precautionDictionary = {}
with open('symptom_precaution.csv') as f:
    data = csv.reader(f, delimiter=',')
    for row in data:
        precautionDictionary[row[0]] = row[1:]

joblib.dump(precautionDictionary, 'precaution_dict.pkl')  


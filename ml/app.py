from pathlib import Path
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from flask import Flask
from flask import request

# Global vars
csv_path = Path('./Diabetes_Normalized.csv').resolve()

spit = ['HighBP', 'HighChol', 'CholCheck', 'BMI', 'Smoker', 'Stroke', 'HeartDiseaseorAttack', 'PhysActivity',
        'Fruits', 'Veggies', 'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost', 'GenHlth', 'DiffWalk', 'Sex',
        'Age', 'Education', 'Income']

dtc = None

def setup():
  global csv_path
  global spit
  global dtc

  data_frame = pd.read_csv(csv_path)
  subject = data_frame.Diabetes_012
  data_frame = data_frame[spit]
  sub_train, sub_test, all_train, all_test = train_test_split(data_frame, subject, test_size=.20)
  _dtc = LogisticRegression()
  _dtc.fit(sub_train, all_train)
  dtc = _dtc

def predict(data_array):
  global spit
  global dtc

  data = [data_array]
  test_data_frame = pd.DataFrame(data, columns=spit)
  prediction = dtc.predict(test_data_frame)
  return prediction.tolist()

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def index():
  data = {}
  errors = []

  if request.method == 'POST':
    data['prediction'] = predict(request.json['normalizedDataFrame'])

  return {
    'data': data,
    'errors': errors
  }

if __name__ == '__main__':
  setup()
  
  if dtc is None:
    print('Error setting up model')
  else:
    app.run(host="0.0.0.0")
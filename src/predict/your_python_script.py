import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
import joblib
import json
import sys
class ColumnSelector(BaseEstimator, TransformerMixin):
    def __init__(self, feature_names):
        self.feature_names = feature_names
    def fit(self, dataframe, labels=None):
        return self
    def transform(self, dataframe):
        return dataframe[self.feature_names].values 
    
def load_model(model_name):
    model = joblib.load('./src/predict/models/' + model_name + '_model.pkl')
    return model

model = load_model("DecisionTreeRegressor")
full_pipeline = joblib.load(r'./src/predict/models/full_pipeline.pkl')
input_data = sys.argv
new_data = pd.DataFrame({'province': [input_data[1]], 'district': [input_data[2]], 'ward': [input_data[3]],'acreage':input_data[4], 'toilet':input_data[5], 'room':input_data[6]})
processed_test_set = full_pipeline.transform(new_data)  
predictions = model.predict(processed_test_set[0]).round(decimals=1)
print(json.dumps(predictions.tolist())) 

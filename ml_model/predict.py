import sys
import json
import numpy as np
import tensorflow as tf
import pickle
import os

def load_resources():
    script_dir = os.path.dirname(__file__)
    scaler_path = os.path.join(script_dir, 'scaler.pkl')
    model_path = os.path.join(script_dir, 'model.keras') 
    
    scaler = pickle.load(open(scaler_path, 'rb'))
    model = tf.keras.models.load_model(model_path)
    return scaler, model

def predict(scaler, model, data):
    input_data = np.array(data).reshape(1, -1)
    scaled_data = scaler.transform(input_data)
    
    prediction = model.predict(scaled_data)
    result = (prediction > 0.5).astype(int)[0][0]
    return result

if __name__ == '__main__':
    try:
        input_data_str = sys.stdin.readlines()[0]
        input_data_json = json.loads(input_data_str)
        
        features = input_data_json['features']
        
        scaler, model = load_resources()
        
        prediction_result = predict(scaler, model, features)
        
        print(json.dumps({'prediction': int(prediction_result)}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))

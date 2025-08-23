from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Test endpoint working"})

@app.route('/api/analyze-ads', methods=['POST', 'OPTIONS'])
def analyze_ads():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    return jsonify({"message": "Analyze ads endpoint working"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

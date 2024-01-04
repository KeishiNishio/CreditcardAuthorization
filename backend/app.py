from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {
    "AAA": {"expiration_date": "24/01", "available_amount": 50000, "billed_amount": 0},
    "BBB": {"expiration_date": "24/02", "available_amount": 40000, "billed_amount": 0},
}

@app.route('/submit-payment', methods=['POST'])
def submit_payment():
    data = request.json
    user = users.get(data["id"])
    
    if user and user["expiration_date"] >= data["expirationDate"] and user["available_amount"] >= int(data["paymentAmount"]):
        user["available_amount"] -= int(data["paymentAmount"])
        return jsonify({"message": "Payment approved"})
    else:
        return jsonify({"message": "Payment denied"}), 400

@app.route('/confirm-payment', methods=['POST'])
def confirm_payment():
    data = request.json
    user = users.get(data["id"])
    
    if user:
        user["billed_amount"] += int(data["paymentAmount"])
        return jsonify({"message": "Payment confirmed and billed."})
    else:
        return jsonify({"message": "Invalid ID"}), 400

@app.route('/check-amounts', methods=['POST'])
def check_amounts():
    data = request.json
    user = users.get(data["id"])
    
    if user and user["expiration_date"] >= data["expirationDate"]:
        return jsonify({
            "availableAmount": user["available_amount"],
            "billedAmount": user["billed_amount"]
        })
    else:
        return jsonify({"message": "Invalid ID or Expiration Date"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

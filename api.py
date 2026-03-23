from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/github')
def github():
    try:
        r = requests.get('https://api.github.com/users/uday2327')
        return jsonify(r.json())
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/leetcode')
def leetcode():
    try:
        query = """
        query {
          userProfileUserQuestionProgress(userSlug: "uday__1") {
            numAcceptedQuestions {
              difficulty
              count
            }
          }
          userContestRanking(username: "uday__1") {
            globalRanking
          }
        }
        """
        r = requests.post('https://leetcode.com/graphql', json={'query': query})
        return jsonify(r.json())
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=3000, debug=True)
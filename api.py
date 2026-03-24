from flask import Flask, jsonify, send_file, send_from_directory
from flask_cors import CORS
import requests
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

@app.route('/resume')
def get_resume():
    try:
        resume_path = os.path.join(os.path.dirname(__file__), 'UdayCV-RT.pdf')
        if os.path.exists(resume_path):
            return send_file(resume_path, mimetype='application/pdf')
        else:
            return jsonify({'error': 'Resume file not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/download')
def download_resume():
    try:
        resume_path = os.path.join(os.path.dirname(__file__), 'UdayCV-RT.pdf')
        if os.path.exists(resume_path):
            return send_file(resume_path, as_attachment=True, download_name='Uday_Dixit_Resume.pdf', mimetype='application/pdf')
        else:
            return jsonify({'error': 'Resume file not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
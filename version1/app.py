from flask import Flask, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'audio_data' in request.files:
        file = request.files['audio_data']
        filename = file.filename
        save_dir = 'audio_recordings'
        save_path = os.path.join(save_dir, filename)

        # Ensure the directory exists
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)

        try:
            file.save(save_path)
            return {'status': 'success'}, 200
        except Exception as e:
            print(f"Error saving file: {e}")
            return {'status': 'error', 'message': str(e)}, 500

    return {'status': 'error', 'message': 'No file part'}, 400

if __name__ == '__main__':
    app.run(debug=True)
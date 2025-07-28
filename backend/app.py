from flask import Flask, request, jsonify
from keybert import KeyBERT

app = Flask(__name__)
kw_model = KeyBERT()

@app.route("/tags", methods=["POST"])
def get_tags():
    try:
        text = request.json.get("text", "")
        keywords = kw_model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words='english',
            top_n=10
        )
        return jsonify([kw[0] for kw in keywords])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)

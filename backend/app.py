from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso

from empath import Empath
lexicon = Empath()

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'


@app.route('/getmsg/', methods=['GET'])
def respond():
    # Retrieve the name from url parameter
    name = request.args.get("name", None)

    # For debugging
    print(f"got name {name}")

    response = {}

    # Check if user sent a name at all
    if not name:
        response["ERROR"] = "no name found, please send a name."
    # Check if the user entered a number not a name
    elif str(name).isdigit():
        response["ERROR"] = "name can't be numeric."
    # Now the user entered a valid name
    else:
        response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"

    # Return the response in json format
    return jsonify(response)

@app.route('/getempath/', methods=['POST'])
def post_something():
    param = request.form.get('text')
    emp = lexicon.analyze(param, normalize=True)
    if param:
        return jsonify({
            "Message": emp,
            # Add this option to distinct the POST request
            "METHOD": "POST"
        })
    else:
        return jsonify({
            "ERROR": "no name found, please send a name."
        })

@app.route('/lasso/', methods=['POST'])
def get_fn():
    df = pd.read_csv('https://docs.google.com/spreadsheets/d/1tWOPuHh4cX3u2LGBSPmvEM9BOA2LNUJUfqXpKYLiBJw/gviz/tq?tqx=out:csv')
    df.drop(['dance', 'wealthy', 'fashion'], axis = 1, inplace=True)
    cols_to_norm =['help', 'pride', 'suffering', 'journalism','blue_collar_job','reading','anonymity','war','poor','pain']
    df[cols_to_norm] = df[cols_to_norm].apply(lambda x: (x - x.min()) / (x.max() - x.min()))
    y_data = df['pss_score']
    x_data = df[['help', 'pride', 'suffering', 'journalism','blue_collar_job','reading','anonymity','war','poor','pain']]
    x_train, x_test, y_train, y_test = train_test_split(x_data, y_data, test_size=0.10, random_state=1)
    lasso_model = Lasso(alpha=1.0, normalize=True)
    lasso=lasso_model.fit(x_train , y_train)
    param = request.form.get('text')
    emp = lexicon.analyze(param, normalize=True)
    x_val = pd.DataFrame([emp])
    x_ = x_val[['help', 'pride', 'suffering', 'journalism','blue_collar_job','reading','anonymity','war','poor','pain']]
    predict = lasso.predict(x_)
    ret_val = ' '.join(map(str, predict))
    response = {
        "test": param,
        "value": ret_val
    }
    return response

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    # app.run(threaded=True, port=5000)
    app.run(threaded=True, port=int(os.environ.get('PORT', 5000)))

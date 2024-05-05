from supabase import create_client
from dotenv import load_dotenv
from flask_cors import CORS
import datetime
import os
import bcrypt
from flask import Flask,request,jsonify
import jwt  
import smtplib
from flask_apscheduler import APScheduler


load_dotenv()

app = Flask(__name__)

scheduler = APScheduler()

supabase_url: str = os.environ.get("SUPABASE_URL")
supabase_key: str = os.environ.get("SUPABASE_KEY")
supabase_ = create_client(supabase_url,supabase_key)
email_secret = os.environ.get("EMAIL_SECRET")

jwt_secret = os.environ.get("JWT_SECRET")

app.config['JWT_SECRET_KEY'] = jwt_secret  


CORS(app)



@app.route('/tasks', methods=['POST'])
def create_task():
    try:
        token = request.headers.get('Authorization')
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        data = request.json
        with open('log.txt','a') as f:
            f.write(str(data))
        username = decoded_token['username']
        expiration_time = decoded_token['exp']
        with open('log.txt','a') as f:
            f.write(str(data))
        response = supabase_.table('users').select("*").eq('username', username).execute()
        for i in response:
            records = i[1]
            break
        user = records[0]
        user_id = user['id']
        with open('log.txt','a') as f:
            f.write(str(data))
        if data['task']:
            data = data['task']
            task_name = data.get('task_name')
            task_description = data.get('task_description')
            task_start_date = data.get('task_start_date')
            task_end_date = data.get('task_end_date')
            status = data.get('status')
        else:
            task_name = data.get('task_name')
            task_description = data.get('task_description')
            task_start_date = data.get('task_start_date')
            task_end_date = data.get('task_end_date')
            status = data.get('status')
        if not task_name or not task_description or not task_start_date or not task_end_date:
            return jsonify({'error': 'Missing data'}), 400

        response = supabase_.table('tasks').insert({
            'user_id': user_id,
            'task_name': task_name,
            'task_description': task_description,
            'task_start_date': task_start_date,
            'task_end_date': task_end_date,
            'status': status
        }).execute()
        return jsonify({'message': 'Task created successfully .'}), 201
    
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired.'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 400
    except:
        return jsonify({'error': 'Error in creating the task .'}), 500
    


# Read task
@app.route('/tasks', methods=['GET'])
def read_task():
    try:
        token = request.headers.get('Authorization')
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        
        username = decoded_token['username']
        expiration_time = decoded_token['exp']
        res = supabase_.table('users').select("id").eq('username', username).execute()

        for i in res:
            records = i[1]
            break
        user = records[0]
        user_id = user['id']
        response = supabase_.table('tasks').select("*").eq('user_id', user_id).execute()

        try:
            for i in response:
                records = i[1]
                break
            return jsonify({'tasks': records}), 200
        except:
            return jsonify({'message' : 'error in fetching data'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired.'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 400

# Update task
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        token = request.headers.get('Authorization')
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        
        username = decoded_token['username']
        expiration_time = decoded_token['exp']

        response = supabase_.table('tasks').select("user_id").eq('id', task_id).execute()
        for i in response:
            records = i[1]
            break
        user = records[0]
        user_id = user['user_id']
        
        response = supabase_.table('users').select("id").eq('username', username).execute()
        for i in response:
            records = i[1]
            break
        user = records[0]
        user_id2 = user['id']

        if user_id != user_id2:
            return jsonify({'error': 'Unauthorized access .'}), 401
        
        data = request.json
        if 'task' in data.keys():
            data = data['task']
            task_name = data.get('task_name')
            task_description = data.get('task_description')
            task_start_date = data.get('task_start_date')
            task_end_date = data.get('task_end_date')
            status = data.get('status')
        task_name = data.get('task_name')
        task_description = data.get('task_description')
        task_start_date = data.get('task_start_date')
        task_end_date = data.get('task_end_date')
        status = data.get('status')
        if not task_name or not task_description or not task_start_date or not task_end_date:
            return jsonify({'error': 'Missing data'}), 400
        try :
            response = supabase_.table('tasks').update({
                'task_name': task_name,
                'task_description': task_description,
                'task_start_date': task_start_date,
                'task_end_date': task_end_date,
                'status': status,
            }).eq('id', task_id).execute()
            return jsonify({'message' : 'Task updated successfully .'}), 200

        except:
            return jsonify({'error': 'Error in updating the task .'}), 500
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired.'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 400


# Delete task
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        token = request.headers.get('Authorization')
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        
        username = decoded_token['username']
        expiration_time = decoded_token['exp']

        response = supabase_.table('tasks').select("user_id").eq('id', task_id).execute()
        for i in response:
            records = i[1]
            break
        user = records[0]
        user_id = user['user_id']

        response = supabase_.table('users').select("id").eq('username', username).execute()
        for i in response:
            records = i[1]
            break
        user = records[0]
        user_id2 = user['id']

        if user_id != user_id2:
            return jsonify({'error': 'Unauthorized access .'}), 401
        
        try:
            response = supabase_.table('tasks').delete().eq('id', task_id).execute()
            return jsonify({'message': 'Task deleted successfully .'}), 200
        except:
            return jsonify({'error': 'Error in deleting the task .'}), 500
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired.'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 400




@app.route('/login',methods=['POST'])
def login():

    data = request.json
    username = data.get('username')
    password = data.get('password')
    try: 
        response = supabase_.table('users').select("*").eq('username', username).execute()
        for i in response:
            records = i[1]
            break
        if len(records) == 0:
            return jsonify({'error': 'Invalid Credentials 12.'}), 404
        user = records[0]
        hashed_password = user['hashed_password']
        salt = user['salt']
        curr_hash = bcrypt.hashpw(password.encode(), salt.encode())
        if curr_hash == hashed_password.encode():
            payload = {
                'username': username,
                'exp': datetime.datetime.today() + datetime.timedelta(hours=1)  # Expiry time of the token (e.g., 1 hour from now)
            }
            access_token = jwt.encode(payload, jwt_secret, algorithm='HS256')
            return jsonify({'token': access_token}), 200
        else:
            return jsonify({'error': f'Invalid Credentials ...'}), 400
    except:
        return jsonify({'error': f'Invalid Credentials 3.'}), 400


@app.route('/signup',methods=['POST'])
def signup():

    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt)
    try: 
        supabase_.table('users').insert([{ 'username': username,'email':email ,'salt':salt.decode(),'hashed_password' : hashed_password.decode()}]).execute()
        return jsonify({'message': 'User created successfully . '}), 201
    except: 
        return jsonify({'error': 'User already exists . '}), 400


@app.route('/stats',methods=['GET'])
def stats():
    try:
        date = datetime.datetime.now()
        date = date.strftime("%Y-%m-%d")
        token = request.headers.get('Authorization')
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        
        username = decoded_token['username']
        expiration_time = decoded_token['exp']

        res = supabase_.table('users').select("id").eq('username', username).execute()

        for i in res:
            records = i[1]
            break
        user = records[0]
        user_id = user['id']
        stats_ = {}

        res_over =  supabase_ \
        .table('tasks') \
        .select('*') \
        .eq('user_id', user_id) \
        .eq('status', False) \
        .lt('task_end_date',date).execute()
        records = []
        for i in res_over:
                    records = i[1]
                    break

        print('Total Overdue Tasks',len(records))
        stats_['overdue'] = len(records)

        completedTasks =  supabase_ \
        .table('tasks') \
        .select('*') \
        .eq('user_id', user_id) \
        .eq('status', True).execute(); 
        records = []
        for i in completedTasks:
            records = i[1]
            break
        print('Total Completed Tasks',len(records))
        stats_['completed'] = len(records)

        pendingTasks =  supabase_ \
        .table('tasks') \
        .select('*') \
        .eq('user_id', user_id) \
        .eq('status', False) \
        .gte('task_end_date', date).execute()
        records = []
        for i in pendingTasks:
            records = i[1]
            break
        print('Total Pending Tasks',len(records))
        stats_['pending'] = len(records)

        totalTasks = supabase_.table('tasks') \
        .select('*') \
        .eq('user_id', user_id).execute()
        records = []
        for i in totalTasks:
            records = i[1]
            break
        print('Total Tasks',len(records))
        stats_['total'] = len(records)
        return jsonify(stats_), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired.'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 400
    except:
        return jsonify({'error': 'Error in fetching stats .'}), 500  

@app.route('/profile',methods=['GET']) 
def profile():
    try:
        token = request.headers.get('Authorization')
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        
        username = decoded_token['username']
        expiration_time = decoded_token['exp']

        res = supabase_.table('users').select("*").eq('username', username).execute()

        for i in res:
            records = i[1]
            break
        user = records[0]
        return jsonify({'username': user['username'],'email':user['email']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired.'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 400 


def job():
    date = datetime.datetime.now()
    formatted_date = date.strftime("%Y-%m-%d")
    incompleted = []
    res_over =  supabase_ \
    .table('tasks') \
    .select('*') \
    .lt('task_end_date',date).execute()
    for i in res_over:
                incompleted = i[1]
                break
    users = supabase_.table('users').select('*').execute()
    for i in users:
            records = i[1]
            break
    
    for user in records:
        incomplete = []
        username = user['username']
        user_id = user['id']
        for task in incompleted:
            if task['user_id'] == user_id:
                incomplete.append(task['task_name'])
        if len(incomplete) > 0:
            sender_email = 'satheeshkumar0807@gmail.com'
            receiver_email = user['email']
            subject = 'Regarding Overdue Tasks'
            message = 'List of tasks that are overdue:\n'
            c = 1
            for task in incomplete:
                message += f'{c} - {task}\n'
                c+=1
            text = f'Subject: {subject}\n\n{message}'
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email,email_secret)
            server.sendmail(sender_email,receiver_email,text)
            print('mail sent')
if __name__ == '__main__':
    scheduler.add_job(id='Scheduled Task', func=job, trigger='interval', hours = 24, replace_existing=True)
    scheduler.start()
    app.run(debug=True,port=8000)

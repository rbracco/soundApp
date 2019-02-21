FROM python:3.7-slim-stretch

RUN apt-get update && apt-get install -y git python3-dev gcc libsndfile1
    && rm -rf /var/lib/apt/lists/* && apt-get install libsndfile1

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt --upgrade

COPY app app/

RUN python app/server.py

EXPOSE 5042

CMD ["python", "app/server.py", "serve"]
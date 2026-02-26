# import os
# from langchain.chat_models import init_chat_model
# from pydantic import BaseModel
# from langchain.agents import create_agent
# from dotenv import load_dotenv
# load_dotenv()
# secret_key=os.getenv("GOOGLE_API_KEY")
# # secret_key=os.getenv("GROQ_API_KEY")

# os.environ["GENAI_API_KEY"]=secret_key

# def get_result(message):
#      model=init_chat_model("google_genai:gemini-2.5-flash-lite")
#     #  model=init_chat_model("groq:qwen/qwen3-32b")
#      res=model.invoke([{"role":"user","content":message}])
#      return res.content




# from ollama import chat
from langchain_ollama import ChatOllama     
# Initialize an empty message history
def get_result(message):
     messages = []
     # Get streaming response while maintaining conversation history
     response_content = ""
     for chunk in ChatOllama(
         'llama3.1:latest',
         messages=messages + [
             {'role': 'system', 'content': 'You are a helpful assistant. You only give a short sentence by answer.'},
             {'role': 'user', 'content': message},
         ],
         stream=True
     ):
         if chunk.message:
             response_chunk = chunk.message.content
             print(response_chunk, end='', flush=True)
             response_content += response_chunk
     # Add the exchange to the conversation history
     messages += [
         {'role': 'user', 'content': message},
         {'role': 'assistant', 'content': response_content},
     ]
     print('\n')  # Add space after response
     return response_content
#https://www.youtube.com/watch?v=yHAbRLhf1lM download karna hai langchain complete video


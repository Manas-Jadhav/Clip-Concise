# -*- coding: utf-8 -*-
import sys  
import os
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai

os.environ['GOOGLE_API_KEY'] = "API KEY"
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

def get_transcript(video_id):
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = ' '.join([d['text'] for d in transcript_list])
    return transcript

def get_summary(generativelanguage_client, transcript):
    try:
        prompt = """You are YouTube video summarizer. You will be taking the transcript text
        and summarizing the entire video, providing important points.
        Please provide the summary of the text given here: """
        response = generativelanguage_client.generate_content(prompt + transcript)

        if response.parts:
            return response.text
        else:
            print("No candidates were returned.")
            print("Prompt feedback:", response.prompt_feedback)
            return None
    except Exception as e:
        print(f"Error generating summary: {e}")
        return None

if __name__ == "__main__":
    video_id = sys.argv[1]
    generativelanguage_client = genai.GenerativeModel("gemini-pro")

    transcript = get_transcript(video_id)
    if transcript is not None:
        summary = get_summary(generativelanguage_client, transcript)
        if summary is not None:
            print("\n[[start]]\n");
            print(summary)
            print("\n[[end]]");
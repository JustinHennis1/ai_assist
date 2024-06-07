from openai import AzureOpenAI
import os



def ai_request():
    client = AzureOpenAI(
        azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key = os.getenv("AZURE_OPENAI_API_KEY"),
        api_version="2024-02-01"
    )

    response = client.chat.completions.create(
        model="gpt-4", # model = "deployment_name".
        messages=[
            {"role": "system", "content": "I'm here to help you find your next movie."},
            {"role": "user", "content": "I want you to give me 5 recommendations for movies based on what I say next."},
        ],
        max_tokens=100
    )


    
    return response.choices[0].message.content

def main():
    ai_request()
    return 0

if __name__ == "__main__":
    main()
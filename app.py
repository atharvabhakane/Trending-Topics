from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import requests
from dotenv import load_dotenv
import os
from newsapi import NewsApiClient
import random

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize News API client
newsapi = NewsApiClient(api_key=os.getenv('NEWS_API_KEY'))

# Color schemes for different niches
NICHE_THEMES = {
    "finance": {
        "primary": "#2E7D32",
        "secondary": "#A5D6A7",
        "background": "#F1F8E9",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "cooking": {
        "primary": "#D84315",
        "secondary": "#FFAB91",
        "background": "#FBE9E7",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "fitness": {
        "primary": "#1976D2",
        "secondary": "#90CAF9",
        "background": "#E3F2FD",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "technology": {
        "primary": "#512DA8",
        "secondary": "#B39DDB",
        "background": "#EDE7F6",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "career": {
        "primary": "#F9A825",
        "secondary": "#FFE082",
        "background": "#FFFDE7",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "entertainment": {
        "primary": "#C2185B",
        "secondary": "#F48FB1",
        "background": "#FCE4EC",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "education": {
        "primary": "#00695C",
        "secondary": "#80CBC4",
        "background": "#E0F2F1",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "travel": {
        "primary": "#0277BD",
        "secondary": "#81D4FA",
        "background": "#E1F5FE",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "business": {
        "primary": "#2E7D32",
        "secondary": "#A5D6A7",
        "background": "#F1F8E9",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "health": {
        "primary": "#1976D2",
        "secondary": "#90CAF9",
        "background": "#E3F2FD",
        "card": "#FFFFFF",
        "text": "#212121"
    },
    "science": {
        "primary": "#00695C",
        "secondary": "#80CBC4",
        "background": "#E0F2F1",
        "card": "#FFFFFF",
        "text": "#212121"
    }
}

# Cache for storing trending topics with timestamp
topic_cache = {}
CACHE_DURATION = timedelta(hours=24)  # Update topics daily

def get_trending_news(category):
    try:
        # Get top headlines for the category
        top_headlines = newsapi.get_top_headlines(
            category=category,
            language='en',
            page_size=10
        )

        # Format the articles
        trending_topics = []
        for article in top_headlines['articles']:
            # Calculate rough view count (for demonstration)
            views = random.randint(5000, 50000)

            topic = {
                "title": article['title'],
                "description": article['description'] or "No description available",
                "views": views,
                "timestamp": article['publishedAt'],
                "key_points": [
                    "Source: " + (article['source']['name'] or "Unknown"),
                    "Author: " + (article['author'] or "Unknown"),
                    "Published: " + article['publishedAt']
                ],
                "related_links": [
                    {
                        "title": "Read Full Article",
                        "url": article['url']
                    },
                    {
                        "title": "More from " + article['source']['name'],
                        "url": f"https://news.google.com/search?q={article['source']['name']}"
                    }
                ]
            }
            trending_topics.append(topic)

        return trending_topics

    except Exception as e:
        print(f"Error fetching news: {str(e)}")
        return []

# Test route to verify API is working
@app.route('/test')
def test():
    return jsonify({"status": "working"})

@app.route('/api/trending')
def get_trending_topics():
    try:
        category = request.args.get('category', 'technology').lower()
        
        # Simplified category mapping
        category_mapping = {
            'technology': 'technology',
            'finance': 'business',
            'entertainment': 'entertainment',
            'health': 'health',
            'science': 'science',
            'sports': 'sports'
        }
        
        news_category = category_mapping.get(category, 'technology')
        
        # Get top headlines
        top_headlines = newsapi.get_top_headlines(
            category=news_category,
            language='en',
            page_size=10
        )
        
        # Format articles
        topics = []
        for article in top_headlines['articles']:
            topic = {
                "title": article['title'] or "No title available",
                "description": article['description'] or "No description available",
                "views": random.randint(5000, 50000),
                "timestamp": article['publishedAt'],
                "key_points": [
                    f"Source: {article['source']['name']}",
                    f"Author: {article['author'] or 'Unknown'}",
                    f"Published: {article['publishedAt']}"
                ],
                "related_links": [
                    {
                        "title": "Read Full Article",
                        "url": article['url']
                    }
                ]
            }
            topics.append(topic)
        
        return jsonify({
            "success": True,
            "data": {
                "topics": topics,
                "theme": NICHE_THEMES.get(category, NICHE_THEMES['technology'])
            }
        })
    except Exception as e:
        print(f"Error: {str(e)}")  # Add this for debugging
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 
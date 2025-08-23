#!/usr/bin/env python3
"""
Test script for the new backend endpoints
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_URL = "http://127.0.0.1:5000"

def test_health():
    """Test the health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"Health check: {response.status_code}")
        if response.status_code == 200:
            print("✓ Health endpoint working")
        else:
            print("✗ Health endpoint failed")
    except Exception as e:
        print(f"✗ Health endpoint error: {e}")

def test_campaign_strategy():
    """Test the campaign strategy generation endpoint"""
    try:
        # Mock data for testing
        test_data = {
            "insights": {
                "competitiveAdvantage": {
                    "uniquePositioning": "Premium quality with competitive pricing"
                },
                "strategicRecommendations": {
                    "marketingStrategy": ["Focus on value proposition", "Emphasize quality"]
                },
                "creativeGuidelines": {
                    "messaging": ["Quality over quantity", "Premium experience"]
                }
            },
            "campaignData": {
                "platform": "facebook",
                "objective": "brand_awareness",
                "targetAudience": "Young professionals aged 25-35",
                "budget": 5000
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/generate-campaign-strategy",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Campaign Strategy: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print("✓ Campaign strategy endpoint working")
            print(f"Response keys: {list(result.keys())}")
        else:
            print(f"✗ Campaign strategy endpoint failed: {response.text}")
            
    except Exception as e:
        print(f"✗ Campaign strategy endpoint error: {e}")

def test_campaign_image():
    """Test the campaign image generation endpoint"""
    try:
        # Mock data for testing
        test_data = {
            "campaign": {
                "platform": "instagram",
                "objective": "engagement",
                "creativeElements": {
                    "headline": "Transform Your Life Today",
                    "visualStyle": "modern and minimalist",
                    "toneOfVoice": "inspirational and motivational"
                }
            },
            "insights": {
                "competitiveAdvantage": {
                    "uniquePositioning": "Life-changing solutions"
                }
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/generate-campaign-image",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Campaign Image: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print("✓ Campaign image endpoint working")
            print(f"Response keys: {list(result.keys())}")
        else:
            print(f"✗ Campaign image endpoint failed: {response.text}")
            
    except Exception as e:
        print(f"✗ Campaign image endpoint error: {e}")

def main():
    """Run all tests"""
    print("Testing AdVision AI Backend Endpoints")
    print("=" * 40)
    
    # Check if server is running
    try:
        test_health()
        print()
        
        # Test new endpoints
        print("Testing Campaign Strategy Generation:")
        test_campaign_strategy()
        print()
        
        print("Testing Campaign Image Generation:")
        test_campaign_image()
        print()
        
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to server. Make sure the backend is running on http://127.0.0.1:5000")
        print("Start the server with: cd server && python app.py")
    
    print("=" * 40)
    print("Test completed!")

if __name__ == "__main__":
    main()

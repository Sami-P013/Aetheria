#!/usr/bin/env python3
"""
Aetheria Backend Authentication Testing Suite
Tests the authentication API endpoints and database functionality
"""

import requests
import json
import os
import sys
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')
load_dotenv('/app/backend/.env')

# Configuration
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://code-construct-1.preview.emergentagent.com')
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'aetheria_db')

print(f"Testing backend at: {BACKEND_URL}")
print(f"MongoDB connection: {MONGO_URL}")
print(f"Database: {DB_NAME}")

class AetheriaAuthTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_user_data = {
            "email": "test@aetheria.com",
            "password": "testpass123",
            "full_name": "Test User"
        }
        self.access_token = None
        self.user_id = None
        self.mongo_client = None
        self.db = None
        
    def setup_database_connection(self):
        """Setup MongoDB connection for database verification"""
        try:
            self.mongo_client = MongoClient(MONGO_URL)
            self.db = self.mongo_client[DB_NAME]
            # Test connection
            self.mongo_client.admin.command('ping')
            print("✅ MongoDB connection established")
            return True
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            return False
    
    def cleanup_test_user(self):
        """Remove test user from database if exists"""
        if self.db:
            try:
                result = self.db.users.delete_many({"email": self.test_user_data["email"]})
                if result.deleted_count > 0:
                    print(f"🧹 Cleaned up {result.deleted_count} existing test user(s)")
            except Exception as e:
                print(f"⚠️ Cleanup warning: {e}")
    
    def test_health_check(self):
        """Test basic API health"""
        print("\n🔍 Testing API Health...")
        try:
            response = self.session.get(f"{self.base_url}/api/health")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Health check passed: {data}")
                return True
            else:
                print(f"❌ Health check failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            print(f"❌ Health check error: {e}")
            return False
    
    def test_signup(self):
        """Test user signup endpoint"""
        print("\n🔍 Testing User Signup...")
        try:
            response = self.session.post(
                f"{self.base_url}/api/auth/signup",
                json=self.test_user_data,
                headers={"Content-Type": "application/json"}
            )
            
            print(f"Response status: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            
            if response.status_code == 201:
                data = response.json()
                print(f"✅ Signup successful: {json.dumps(data, indent=2, default=str)}")
                
                # Verify response structure
                if "access_token" in data and "user" in data:
                    self.access_token = data["access_token"]
                    user = data["user"]
                    self.user_id = user["id"]
                    
                    # Verify user data
                    if (user["email"] == self.test_user_data["email"] and
                        user["full_name"] == self.test_user_data["full_name"] and
                        user["subscription_tier"] == "free" and
                        user["subscription_status"] == "active"):
                        print("✅ User data structure verified")
                        return True
                    else:
                        print(f"❌ User data mismatch: {user}")
                        return False
                else:
                    print(f"❌ Missing required fields in response: {data}")
                    return False
            else:
                print(f"❌ Signup failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Signup error: {e}")
            return False
    
    def test_duplicate_signup(self):
        """Test duplicate email signup returns 400"""
        print("\n🔍 Testing Duplicate Email Signup...")
        try:
            response = self.session.post(
                f"{self.base_url}/api/auth/signup",
                json=self.test_user_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 400:
                data = response.json()
                print(f"✅ Duplicate signup correctly rejected: {data}")
                return True
            else:
                print(f"❌ Duplicate signup should return 400, got: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Duplicate signup test error: {e}")
            return False
    
    def test_login(self):
        """Test user login endpoint"""
        print("\n🔍 Testing User Login...")
        try:
            login_data = {
                "email": self.test_user_data["email"],
                "password": self.test_user_data["password"]
            }
            
            response = self.session.post(
                f"{self.base_url}/api/auth/login",
                json=login_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Login successful: {json.dumps(data, indent=2, default=str)}")
                
                # Verify response structure
                if "access_token" in data and "user" in data:
                    self.access_token = data["access_token"]
                    user = data["user"]
                    
                    # Verify user data matches signup
                    if (user["email"] == self.test_user_data["email"] and
                        user["full_name"] == self.test_user_data["full_name"]):
                        print("✅ Login user data verified")
                        return True
                    else:
                        print(f"❌ Login user data mismatch: {user}")
                        return False
                else:
                    print(f"❌ Missing required fields in login response: {data}")
                    return False
            else:
                print(f"❌ Login failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Login error: {e}")
            return False
    
    def test_invalid_login(self):
        """Test login with invalid credentials returns 401"""
        print("\n🔍 Testing Invalid Login...")
        try:
            invalid_data = {
                "email": self.test_user_data["email"],
                "password": "wrongpassword"
            }
            
            response = self.session.post(
                f"{self.base_url}/api/auth/login",
                json=invalid_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 401:
                data = response.json()
                print(f"✅ Invalid login correctly rejected: {data}")
                return True
            else:
                print(f"❌ Invalid login should return 401, got: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Invalid login test error: {e}")
            return False
    
    def test_get_me(self):
        """Test get current user endpoint"""
        print("\n🔍 Testing Get Current User...")
        try:
            if not self.access_token:
                print("❌ No access token available for /me test")
                return False
            
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            response = self.session.get(
                f"{self.base_url}/api/auth/me",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Get me successful: {json.dumps(data, indent=2, default=str)}")
                
                # Verify user data
                if (data["email"] == self.test_user_data["email"] and
                    data["full_name"] == self.test_user_data["full_name"]):
                    print("✅ Current user data verified")
                    return True
                else:
                    print(f"❌ Current user data mismatch: {data}")
                    return False
            else:
                print(f"❌ Get me failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Get me error: {e}")
            return False
    
    def test_get_me_without_token(self):
        """Test get current user without token returns 401"""
        print("\n🔍 Testing Get Current User Without Token...")
        try:
            response = self.session.get(f"{self.base_url}/api/auth/me")
            
            if response.status_code == 401:
                print("✅ Unauthorized access correctly rejected")
                return True
            else:
                print(f"❌ Should return 401 without token, got: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Unauthorized test error: {e}")
            return False
    
    def verify_database_user(self):
        """Verify user is correctly stored in database"""
        print("\n🔍 Verifying Database User Storage...")
        try:
            if not self.db:
                print("❌ No database connection available")
                return False
            
            user_doc = self.db.users.find_one({"email": self.test_user_data["email"]})
            
            if user_doc:
                print(f"✅ User found in database: {user_doc['email']}")
                
                # Verify user structure
                required_fields = ["id", "email", "full_name", "hashed_password", 
                                 "subscription_tier", "subscription_status", "created_at", "updated_at"]
                
                missing_fields = [field for field in required_fields if field not in user_doc]
                if missing_fields:
                    print(f"❌ Missing database fields: {missing_fields}")
                    return False
                
                # Verify password is hashed (not plain text)
                if user_doc["hashed_password"] == self.test_user_data["password"]:
                    print("❌ Password is stored in plain text!")
                    return False
                elif user_doc["hashed_password"].startswith("$2b$"):
                    print("✅ Password is properly hashed (bcrypt)")
                else:
                    print(f"⚠️ Password hash format unexpected: {user_doc['hashed_password'][:20]}...")
                
                # Verify subscription defaults
                if (user_doc["subscription_tier"] == "free" and 
                    user_doc["subscription_status"] == "active"):
                    print("✅ Subscription defaults verified")
                    return True
                else:
                    print(f"❌ Subscription defaults incorrect: tier={user_doc['subscription_tier']}, status={user_doc['subscription_status']}")
                    return False
            else:
                print("❌ User not found in database")
                return False
                
        except Exception as e:
            print(f"❌ Database verification error: {e}")
            return False
    
    def run_all_tests(self):
        """Run all authentication tests"""
        print("🚀 Starting Aetheria Authentication Tests")
        print("=" * 50)
        
        results = {}
        
        # Setup
        results["database_connection"] = self.setup_database_connection()
        self.cleanup_test_user()
        
        # API Tests
        results["health_check"] = self.test_health_check()
        results["signup"] = self.test_signup()
        results["duplicate_signup"] = self.test_duplicate_signup()
        results["login"] = self.test_login()
        results["invalid_login"] = self.test_invalid_login()
        results["get_me"] = self.test_get_me()
        results["get_me_unauthorized"] = self.test_get_me_without_token()
        
        # Database verification
        results["database_verification"] = self.verify_database_user()
        
        # Cleanup
        self.cleanup_test_user()
        
        # Summary
        print("\n" + "=" * 50)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 50)
        
        passed = 0
        total = len(results)
        
        for test_name, result in results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"{test_name.replace('_', ' ').title()}: {status}")
            if result:
                passed += 1
        
        print(f"\nOverall: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All authentication tests PASSED!")
            return True
        else:
            print(f"⚠️ {total - passed} test(s) FAILED")
            return False
    
    def __del__(self):
        """Cleanup resources"""
        if self.mongo_client:
            self.mongo_client.close()

if __name__ == "__main__":
    tester = AetheriaAuthTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)
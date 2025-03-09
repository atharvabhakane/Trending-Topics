# 🌟 Trending Topics Website

A modern, responsive web application that displays trending topics across various categories with a beautiful UI and dynamic theme switching.

## 📋 Features

- **Dynamic Categories**: Browse trending topics across multiple categories
  - Technology
  - Finance
  - Entertainment
  - Health
  - Science
  - Sports

- **Modern UI/UX**:
  - Glassmorphism design
  - Smooth animations and transitions
  - Responsive layout for all devices
  - Category-specific color themes
  - Interactive card components

- **Real-time Updates**:
  - Loading states with spinner animation
  - Error handling with user-friendly messages
  - Smooth theme transitions

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3 (with modern features like CSS Grid, Flexbox)
- JavaScript (Vanilla JS, ES6+)
- Google Fonts (Poppins)

### Backend
- Python
- Flask
- Werkzeug

## 🚀 Getting Started

### Prerequisites
- Python 3.x
- Web browser (Chrome, Firefox, Safari, or Edge recommended)
- Text editor or IDE

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd trending-topics
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
cd backend
python app.py
```

4. Open the frontend:
- Navigate to the `frontend` directory
- Open `index.html` in your web browser
- Or use a local server:
```bash
python -m http.server 8000
```

## 📁 Project Structure 

## 💻 Usage

1. Select a category from the dropdown menu
2. Browse through trending topics in that category
3. Click on cards to expand and see more details
4. Follow related links for more information

## 🎨 Theme Customization

The application features dynamic theming with category-specific colors:
- Technology: Deep Blue
- Finance: Green
- Entertainment: Pink
- Health: Teal
- Science: Deep Purple
- Sports: Orange

## 🔧 API Endpoints

### Get Trending Topics
```
GET /api/trending?category={category_name}
```

Returns trending topics for the specified category.

Response format:
```json
{
    "success": true,
    "data": {
        "topics": [
            {
                "title": "Topic Title",
                "description": "Topic Description",
                "key_points": ["Point 1", "Point 2"],
                "related_links": [
                    {
                        "title": "Link Title",
                        "url": "https://example.com"
                    }
                ]
            }
        ]
    }
}
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👏 Acknowledgments

- Design inspiration from Material Design
- Icons and images from Unsplash
- Font families from Google Fonts


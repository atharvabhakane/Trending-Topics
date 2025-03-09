const API_BASE_URL = 'http://127.0.0.1:5000/api';

const THEMES = {
    technology: {
        primary: '#2962FF',  // Deep blue
        secondary: '#82B1FF',
        background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)'
    },
    finance: {
        primary: '#2E7D32',  // Green
        secondary: '#A5D6A7',
        background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)'
    },
    cooking: {
        primary: '#D84315',
        secondary: '#FFAB91',
        background: 'linear-gradient(135deg, #FBE9E7, #FFCCBC)'
    },
    fitness: {
        primary: '#1976D2',
        secondary: '#90CAF9',
        background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)'
    },
    career: {
        primary: '#F9A825',
        secondary: '#FFE082',
        background: 'linear-gradient(135deg, #FFFDE7, #FFF9C4)'
    },
    entertainment: {
        primary: '#D81B60',  // Pink
        secondary: '#FF4081',
        background: 'linear-gradient(135deg, #FCE4EC, #F8BBD0)'
    },
    health: {
        primary: '#00BFA5',  // Teal
        secondary: '#64FFDA',
        background: 'linear-gradient(135deg, #E0F2F1, #B2DFDB)'
    },
    science: {
        primary: '#6200EA',  // Deep Purple
        secondary: '#B388FF',
        background: 'linear-gradient(135deg, #EDE7F6, #D1C4E9)'
    },
    sports: {
        primary: '#FF6D00',  // Orange
        secondary: '#FFB74D',
        background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)'
    }
};

const DEFAULT_IMAGES = {
    technology: {
        ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        coding: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        gadgets: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        default: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
    },
    finance: {
        stocks: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f',
        crypto: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
        banking: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60',
        default: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3'
    },
    entertainment: {
        movies: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
        music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        gaming: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
        default: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852'
    },
    health: {
        fitness: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        nutrition: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        wellness: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        default: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'
    },
    science: {
        space: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        research: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb',
        environment: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
        default: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31'
    },
    sports: {
        football: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2',
        basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
        tennis: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
        default: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('categorySelect');
    const topicsContainer = document.getElementById('topicsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    // Load initial data and theme
    fetchTrendingTopics('technology');
    applyTheme('technology');

    // Add event listener for category changes
    categorySelect.addEventListener('change', (e) => {
        fetchTrendingTopics(e.target.value);
        applyTheme(e.target.value);
    });

    function applyTheme(category) {
        const theme = THEMES[category] || THEMES.technology;
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--background', theme.background);
        
        // Animate theme change
        document.body.style.transition = 'background 0.5s ease';
        document.body.style.background = theme.background;
    }

    async function fetchTrendingTopics(category) {
        try {
            showLoading(true);
            const response = await fetch(`${API_BASE_URL}/trending?category=${category}`);
            const data = await response.json();

            if (data.success) {
                displayTopics(data.data.topics);
            } else {
                throw new Error(data.error || 'Failed to fetch topics');
            }
        } catch (error) {
            showError(error.message);
        } finally {
            showLoading(false);
        }
    }

    function displayTopics(topics) {
        topicsContainer.innerHTML = '';
        errorMessage.classList.add('hidden');

        topics.forEach(topic => {
            const card = document.createElement('div');
            card.className = 'topic-card';
            
            card.innerHTML = `
                <h3>${topic.title}</h3>
                <p>${topic.description}</p>
                <div class="topic-details">
                    <ul class="key-points">
                        ${topic.key_points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                    <div class="related-links">
                        ${topic.related_links.map(link => 
                            `<a href="${link.url}" target="_blank">${link.title}</a>`
                        ).join('')}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });

            topicsContainer.appendChild(card);
        });
    }

    function showLoading(show) {
        loadingSpinner.classList.toggle('hidden', !show);
        if (show) {
            topicsContainer.style.opacity = '0.5';
            topicsContainer.style.pointerEvents = 'none';
        } else {
            topicsContainer.style.opacity = '1';
            topicsContainer.style.pointerEvents = 'auto';
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        topicsContainer.innerHTML = '';
    }

    // Add this function to handle image loading
    function handleImageLoad(img) {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            const loadingEl = img.previousElementSibling;
            if (loadingEl && loadingEl.classList.contains('image-loading')) {
                loadingEl.remove();
            }
        });
    }
}); 
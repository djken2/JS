document.addEventListener("DOMContentLoaded", () => {
    // Clock
    function updateClock() {
        const clock = document.getElementById("clock");
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Login
    const loginForm = document.getElementById("login-form");
    const welcomeMessage = document.getElementById("welcome-message");

    if (localStorage.getItem("username")) {
        welcomeMessage.textContent = `Welcome, ${localStorage.getItem("username")}!`;
        loginForm.style.display = "none";
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        localStorage.setItem("username", username);
        welcomeMessage.textContent = `Welcome, ${username}!`;
        loginForm.style.display = "none";
    });

    // Todo List
    const todoForm = document.getElementById("todo-form");
    const todoList = document.getElementById("todo-list");

    function renderTodoList() {
        todoList.innerHTML = "";
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => {
            const li = document.createElement("li");
            li.textContent = todo;
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const todoInput = document.getElementById("todo-input");
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push(todoInput.value);
        localStorage.setItem("todos", JSON.stringify(todos));
        todoInput.value = "";
        renderTodoList();
    });

    renderTodoList();

    // Weather and Location
    function getWeather(lat, lon) {
        const apiKey = "YOUR_API_KEY";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weather = document.getElementById("weather");
                weather.textContent = `Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                const weather = document.getElementById("weather");
                weather.textContent = "Weather information is currently unavailable.";
            });
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
            }, error => {
                console.error('Error getting location:', error);
                const weather = document.getElementById("weather");
                weather.textContent = "Geolocation information is currently unavailable.";
            });
        } else {
            const weather = document.getElementById("weather");
            weather.textContent = "Geolocation is not supported by this browser.";
        }
    }

    getLocation();
});

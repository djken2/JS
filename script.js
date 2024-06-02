document.addEventListener("DOMContentLoaded", () => {
    function updateClock() {
        const clock = document.getElementById("clock");
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

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

    const todoForm = document.getElementById("todo-form");
    const todoList = document.getElementById("todo-list");

    function renderTodoList() {
        todoList.innerHTML = "";
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.textContent = todo;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos));
                renderTodoList();
            });
            li.appendChild(deleteButton);
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

    const images = [
        "url(image1.jpg)",
        "url(image2.jpg)",
        "url(image3.jpg)",
    ];
    document.body.style.backgroundImage = images[Math.floor(Math.random() * images.length)];

    function getWeather(lat, lon) {
        const apiKey = "your_openweathermap_api_key";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const weather = document.getElementById("weather");
                weather.textContent = `Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;
            });
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
            });
        } else {
            const weather = document.getElementById("weather");
            weather.textContent = "Geolocation is not supported by this browser.";
        }
    }

    getLocation();
});

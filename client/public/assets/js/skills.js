// Fetch skills data from the API and populate the table
function fetchWorkExperienceData() {
    return fetch('http://localhost:3000/api/skills')
      .then(response => response.json())
      .then(data => {
        const table = document.querySelector('.work-experience');
        const tbody = table.querySelector('#work-experience');
    
        // Clear the existing table rows
        tbody.innerHTML = '';
    
        // Create a new row for each skill and populate the cells
        data.forEach(skill => {
          const row = document.createElement('tr');
    
          const nameCell = document.createElement('td');
          nameCell.textContent = skill.name;
          row.appendChild(nameCell);
    
          const dateCell = document.createElement('td');
          dateCell.textContent = skill.date;
          row.appendChild(dateCell);
    
          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = skill.description;
          row.appendChild(descriptionCell);
    
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching skills data:', error);
      });
  }
  
  // Call the fetchWorkExperienceData function to populate the table when the page is loaded
  window.addEventListener('DOMContentLoaded', fetchWorkExperienceData);
  
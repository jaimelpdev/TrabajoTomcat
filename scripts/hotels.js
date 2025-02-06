document.addEventListener('DOMContentLoaded', function() {
    const searchOptions = document.querySelectorAll('.search-options li');
    const searchButton = document.querySelector('button');
  
    searchOptions.forEach(option => {
      option.addEventListener('click', function() {
        searchOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  
    searchButton.addEventListener('click', function() {
      const selectedOption = document.querySelector('.search-options li.selected');
      if (selectedOption) {
        alert(`Searching for ${selectedOption.textContent}`);
      } else {
        alert('Please select an option before searching.');
      }
    });
  });
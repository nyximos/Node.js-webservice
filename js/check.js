function selectAll(selectAll)  {
    const checkboxes 
         = document.getElementsByName('ok');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }
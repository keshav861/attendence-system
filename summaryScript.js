const attendanceData = JSON.parse(localStorage.getItem('attendanceData'));

const summaryTbody = document.querySelector("#summaryTable tbody");

attendanceData.forEach(data => {
    const row = document.createElement('tr');

    const rollNoCell = document.createElement('td');
    rollNoCell.textContent = data.rollNo;
    row.appendChild(rollNoCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = data.name;
    row.appendChild(nameCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = data.status;
    statusCell.className = data.status.toLowerCase();
    row.appendChild(statusCell);

    summaryTbody.appendChild(row);
});

const students = [
    { rollNo: 221030454, name: "keshav maheshwari" },
    { rollNo: 221030455, name: "rr" },
    { rollNo: 221030456, name: "t" },
    { rollNo: 221030457, name: "rf" },
    { rollNo: 221030458, name: "g" },
    { rollNo: 221030459, name: "h" },
    { rollNo: 221030460, name: "d" },
    { rollNo: 221030461, name: "l" }
];

const inputTbody = document.querySelector("#inputTable tbody");
students.forEach(student => {
    const row = document.createElement('tr');

    const rollNoCell = document.createElement('td');
    rollNoCell.textContent = student.rollNo;
    row.appendChild(rollNoCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    ['Present', 'Absent'].forEach(status => {
        const statusCell = document.createElement('td');
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = `status-${student.rollNo}`;
        radioButton.value = status;
        statusCell.appendChild(radioButton);
        row.appendChild(statusCell);
    });

    inputTbody.appendChild(row);
});

function markAll(status) {
    let allAreAlreadyMarked = true;

    students.forEach(student => {
        const radioButton = document.querySelector(`input[name="status-${student.rollNo}"][value="${status}"]`);
        if (!radioButton.checked) {
            allAreAlreadyMarked = false;
        }
    });

    students.forEach(student => {
        const radioButton = document.querySelector(`input[name="status-${student.rollNo}"][value="${status}"]`);
        if (allAreAlreadyMarked) {
            radioButton.checked = false;
        } else {
            radioButton.checked = true;
        }
    });
}


function handleExcelUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
            type: 'binary'
        });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const excelData = XLSX.utils.sheet_to_json(worksheet);

        displayExcelData(excelData);
        markAttendanceFromExcel(excelData);
    };

    reader.readAsBinaryString(file);
}

function displayExcelData(excelData) {
    const tbody = document.querySelector("#excelDataDisplay tbody");
    tbody.innerHTML = ''; 

    excelData.forEach(entry => {
        const row = document.createElement('tr');

        const rollNoCell = document.createElement('td');
        rollNoCell.textContent = entry['roll no'];
        row.appendChild(rollNoCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = entry['name'];
        row.appendChild(nameCell);

        const attendanceCell = document.createElement('td');
        attendanceCell.textContent = entry['attendance'];
        row.appendChild(attendanceCell);

        tbody.appendChild(row);
    });
}

function markAttendanceFromExcel(excelData) {
    excelData.forEach(entry => {
        const rollNo = entry['roll no'];
        const attendance = (entry.attendance || "").toLowerCase() === "p" ? "Present" : "Absent";

        document.querySelector(`input[name="status-${rollNo}"][value="${attendance}"]`).checked = true;
    });
}



function saveData() {
    const attendanceData = students.map(student => {
        const status = document.querySelector(`input[name="status-${student.rollNo}"]:checked`).value;
        return {
            rollNo: student.rollNo,
            name: student.name,
            status: status
        };
    });
    
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

    window.location.href = 'summary.html';
}


function calc() {
    const settings = {
        async: true,
        crossDomain: true,
        url: "https://ma-lexington.myfollett.com/aspen/portalClassList.do?navkey=academics.classes.list",
        method: "GET",
    };

    $.ajax(settings).done(function (response) {
        const GradesRe = /<td nowrap>\n\n(.*)\n\n\n<\/td>/gm;
        const grades = [...response.matchAll(GradesRe)];
        let GradeLetterSum = 0;
        let GradeCount = 0;
        const GradeScale = { "A+": 13 / 3, A: 4, "A-": 11 / 3, "B+": 10 / 3, B: 3, "B-": 8 / 3, "C+": 7 / 3, C: 2, "C-": 5 / 3, "D+": 4 / 3, D: 1, "D-": 2 / 3, F: 0 };
        for (let i = 0; i < grades.length; i++) {
            const match = grades[i];
            let grade = match[1];
            if (grade) {
                grade = grade.split(" ");
                const GradeLetter = grade[1];
                GradeLetterSum += GradeScale[GradeLetter];
                GradeCount++;
            }
        }
        const gpa = GradeLetterSum / GradeCount;

        alert(`Your GPA is: ${gpa}`);
    });
}

try {
    hostname = window.location.hostname;
    if (hostname == "ma-lexington.myfollett.com") {
        calc();
    } else {
        window.location = "https://ma-lexington.myfollett.com";
    }
} catch (error) {
    alert(error);
}

import fs from "fs/promises";

class StudentNode {
    constructor (st_last_name, st_first_name, grade, classroom, bus, t_last_name, t_first_name) {
        this.next = null;
        this.data = {
            st_last_name,
            st_first_name,
            grade,
            classroom,
            bus,
            t_last_name,
            t_first_name
        };
    }
}

class LinkedList {
    constructor () { 
        this.head = null;
        this.tail = null;
        this.length = 0; 
    }

    append (st_last_name, st_first_name, grade, classroom, bus, t_last_name, t_first_name) {
        const new_node = new StudentNode(st_last_name, st_first_name, grade, classroom, bus, t_last_name, t_first_name);

        if (!this.head) { this.head = new_node; } 
        else { this.tail.next = new_node; }

        new_node.next = null;
        this.tail = new_node;
        this.length++;

        return this;
    }

    find_classroom_by_student_surname (surname) {
        surname = surname.toUpperCase();
        
        let current_node = this.head;
        while (current_node) {
            if (current_node.data.st_last_name === surname)
                console.log(`${current_node.data.st_last_name} ${current_node.data.st_first_name} - ${current_node.data.classroom}`);

            current_node = current_node.next;
        }

        console.log("\n\n");
    }

    find_bus_route_by_student_surname (surname) {
        surname = surname.toUpperCase();
        
        let current_node = this.head;
        while (current_node) {
            if (current_node.data.st_last_name === surname)
                console.log(`${current_node.data.st_last_name} ${current_node.data.st_first_name} - ${current_node.data.bus}`);

            current_node = current_node.next;
        }

        console.log("\n\n");
    }

    find_students_by_teacher_surname (surname) {
        surname = surname.toUpperCase();
        
        let current_node = this.head;
        while (current_node) {
            if (current_node.data.t_last_name === surname)
                console.log(`${current_node.data.st_last_name} ${current_node.data.st_first_name} ${current_node.data.grade} ${current_node.data.classroom} ${current_node.data.bus} ${current_node.data.t_last_name} ${current_node.data.t_first_name}`);

            current_node = current_node.next;
        }

        console.log("\n\n");
    }

    find_students_by_bus_route (bus_route) {
        let current_node = this.head;
        while (current_node) {
            if (current_node.data.bus === bus_route)
                console.log(`${current_node.data.st_last_name} ${current_node.data.st_first_name} ${current_node.data.grade} ${current_node.data.classroom} ${current_node.data.bus} ${current_node.data.t_last_name} ${current_node.data.t_first_name}`);

            current_node = current_node.next;
        }

        console.log("\n\n");
    }

    find_students_by_grade (grade) {
        let current_node = this.head;
        while (current_node) {
            if (current_node.data.grade === grade)
                console.log(`${current_node.data.st_last_name} ${current_node.data.st_first_name} ${current_node.data.grade} ${current_node.data.classroom} ${current_node.data.bus} ${current_node.data.t_last_name} ${current_node.data.t_first_name}`);

            current_node = current_node.next;
        }

        console.log("\n\n");
    }
}

const get_user_input = (prompt) => {
    return new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once("data", data => resolve(data.toString().trim()));
    });
}

function validate_user_input (input, min, max) {
    const value = Number(input);
    return !isNaN(value) && value >= min && value <= max;
}

(async () => {
    const STUDENTS_FILE_PATH = "./students.txt";

    try {
        try { await fs.access(STUDENTS_FILE_PATH); }
        catch (error) { throw new Error("File students.txt not found"); } 

        const file_content = await fs.readFile(STUDENTS_FILE_PATH, "utf-8");
        const lines = file_content
            .split("\n")
            .map(line => line.replace("\r", ""));

        const students_ll = new LinkedList();

        lines.forEach(line => {
            if (line.trim()) {
                const line_content = line.split(",");
                students_ll.append(
                    line_content[0],
                    line_content[1],
                    line_content[2],
                    line_content[3],
                    line_content[4],
                    line_content[5],
                    line_content[6],
                );
            }    
        });

        while (true) {
            const user_input = await get_user_input("1. Find a student's classroom by surname\n2. Find a student's bus route by surname\n3. Find a teacher's students by surname\n4. Find students by their bus route\n5. Find students by their grade\n6. exit\n\n[option]: ");
            if (!validate_user_input(user_input, 1, 6)) throw new Error("Invalid user input");

            let user_details_input;
            switch (parseInt(user_input)) {
                case 1: 
                    user_details_input = await get_user_input("[student's surname]: ");
                    console.log("\n");

                    students_ll.find_classroom_by_student_surname(user_details_input);
                    break;
                case 2:
                    user_details_input = await get_user_input("[student's surname]: ");
                    console.log("\n");

                    students_ll.find_bus_route_by_student_surname(user_details_input);
                    break;
                case 3:
                    user_details_input = await get_user_input("[teacher's surname]: ");
                    console.log("\n");

                    students_ll.find_students_by_teacher_surname(user_details_input);
                    break;
                case 4:
                    user_details_input = await get_user_input("[bus route]: ");
                    console.log("\n");

                    students_ll.find_students_by_bus_route(user_details_input);
                    break;
                case 5:
                    user_details_input = await get_user_input("[grade]: ");
                    console.log("\n");

                    students_ll.find_students_by_grade(user_details_input);
                    break;
                case 6:
                    process.exit(0);
            }
        }
    } catch (error) { 
        console.log(`An error occurred: ${ error.message }`); 
        process.exit(0);
    }
})();
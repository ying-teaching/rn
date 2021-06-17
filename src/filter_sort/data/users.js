const USERS = [
  { name: "Devin", gpa: 3.0 },
  { name: "Dan", gpa: 4.0 },
  { name: "Dominic", gpa: 3.2 },
  { name: "Jackson", gpa: 3.4 },
  { name: "James", gpa: 3.7 },
  { name: "Joel", gpa: 2.0 },
  { name: "John", gpa: 3.9 },
  { name: "Jillian", gpa: 4.0 },
  { name: "Jimmy", gpa: 3.5 },
  { name: "Julie", gpa: 3.3 },
];

export default USERS;

function filterUsers(text) {
  return USERS.filter((user) => {
    if (text) {
      return user.name.includes(text);
    } else {
      return true;
    }
  });
}

export function filterSortByName(text, asc) {
  const newData = filterUsers(text);

  const sortFunction = asc
    ? (u1, u2) => u1.name.localeCompare(u2.name)
    : (u1, u2) => u2.name.localeCompare(u1.name);

  return newData.sort(sortFunction);
}

export function filterSortByGpa(text, asc) {
  const newData = filterUsers(text);

  const sortFunction = asc
    ? (u1, u2) => u1.gpa - u2.gpa
    : (u1, u2) => u2.gpa - u1.gpa;

  return newData.sort(sortFunction);
}

const DELAY = 5000;

export function fetchData() {
  const promise = new Promise((resolve, reject) => {
    console.log("start fetching data...");
    setTimeout(() => {
      console.log("Resolve data.");
      resolve(USERS);
    }, DELAY);
  });

  return promise;
}

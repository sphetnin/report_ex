const executive = [
  "sopon@bluesystem.co.th",
  "napassanun@bluesystem.co.th",
  "panupong@bluesystem.co.th",
  "panyapanuch@bluesystem.co.th",
];

export function getPrivilegeMenu(email) {
  if (executive.includes(email)) {
    return ["Nothing", "Executive", "Accounting"];
  }
  // หรือหากไม่พบอีเมลในอาร์เรย์
  return [];
}

export function getRoleUser(role) {
  switch (role) {
    case "Executive":
      return "Executive";
    case "Accounting":
      return "Accounting";
    case "Sale":
      return "Sale";
    case "Admin":
      return "Admin";
  }
}

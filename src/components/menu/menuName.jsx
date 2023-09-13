export function getMenuName(menu) {
  switch (menu) {
    case "Nothing":
      return "หน้าหลัก";
    case "Executive":
      return "รายงานผู้บริหาร";
    case "Sale":
      return "รายงานเซลล์";
    case "Accounting":
      return "รายงานบัญชี";
    case "Other":
      return "รายงานอืน ๆ";
  }
}

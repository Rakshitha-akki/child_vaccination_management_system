import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: Add custom font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxM.woff",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  childInfo: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
});

const VaccinationReport = ({ child, records }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Vaccination Report</Text>

      <View style={styles.childInfo}>
        <Text>Child Name: {child.name}</Text>
        <Text>Gender: {child.gender}</Text>
        <Text>DOB: {new Date(child.DOB).toLocaleDateString()}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Vaccine</Text>
          <Text style={styles.tableCell}>Due Age</Text>
          <Text style={styles.tableCell}>Scheduled Date</Text>
          <Text style={styles.tableCell}>Status</Text>
        </View>

        {records.map((vaccine, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{vaccine.vaccineName}</Text>
            <Text style={styles.tableCell}>{vaccine.dueAge}</Text>
            <Text style={styles.tableCell}>
              {vaccine.scheduled_date
                ? new Date(vaccine.scheduled_date).toLocaleDateString()
                : "Not Scheduled"}
            </Text>
            <Text style={styles.tableCell}>{vaccine.status}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default VaccinationReport;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Benemaint.Model
{
    public class ValicModel
    {
        public string PolicyNumber { get; set; }
        public string COCD { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SSN { get; set; }

        public ValicModel() { }

        public ValicModel(string policynumber, string cocd, string firstname, string lastname, string ssn)
        {
            PolicyNumber = policynumber;
            COCD = cocd;
            FirstName = firstname;
            LastName = lastname;
            SSN = ssn;
        }

        public class BeneInfo
        {
            public string SSN { get; set; } //PTP_IDT
            public string SSN_Type { get; set; } //PTP_IDT_TYP_COD
            public string AcctNum { get; set; } //ACCT_NUM
            public string CRDA_BeneDte { get; set; } //AWD_CRDA_BENE_DATE
            public string Bene_Type { get; set; } //BENEFICIARY_TYPE
            public string Bene_SSN { get; set; } //BENE_SSN_NUM
            public string Bene_Name { get; set; } //BENE_FULL_NAME
            public string Bene_DOB { get; set; } //BENE_DATE_OF_BIRTH
            public string Relationship { get; set; } // RELATIONSHIP_TO_PARTICIPANT
            public string bene_per { get; set; } //BENEFICIARY_PERCENT
            public string Multi_Bene { get; set; } //ADDITIONAL_BENE_FLAG
            public string userid { get; set; } // LAST_MAINT_USER
            public string bene_add1 { get; set; } //BENE_ADDRESS_1
            public string bene_add2 { get; set; } //BENE_ADDRESS_2
            public string bene_city { get; set; } //BENE_CITY
            public string bene_state { get; set; } //BENE_STATE
            public string bene_zip { get; set; } //BENE_ZIP_CODE
            public string bene_fzip { get; set; } //BENE_FOREIGN_ZIP_CODE
            public string Active_Bene { get; set; } //ACTIVE_BENE_FLAG
            

        }

        public class BeneList
        {
                public List<Beneficiary> data { get; set; }
        }

        public class Beneficiary
        {
            public string PTP_IDT { get; set; } //PTP_IDT
            public string PTP_IDT_TYP_COD { get; set; } //PTP_IDT_TYP_COD
            public string ACCT_NUM { get; set; } //ACCT_NUM
            public string AWD_CRDA_BENE_DATE { get; set; } //AWD_CRDA_BENE_DATE
            public string BENEFICIARY_TYPE { get; set; } //BENEFICIARY_TYPE
            public string BENE_SSN_NUM { get; set; } //BENE_SSN_NUM
            public string BENE_FULL_NAME { get; set; } //BENE_FULL_NAME
            public string BENE_DATE_OF_BIRTH { get; set; } //BENE_DATE_OF_BIRTH
            public string RELATIONSHIP_TO_PARTICIPANT { get; set; } // RELATIONSHIP_TO_PARTICIPANT
            public string BENEFICIARY_PERCENT { get; set; } //BENEFICIARY_PERCENT
            public string ADDITIONAL_BENE_FLAG { get; set; } //ADDITIONAL_BENE_FLAG
            public string LAST_MAINT_USER { get; set; } // LAST_MAINT_USER
            public string BENE_ADDRESS_1 { get; set; } //BENE_ADDRESS_1
            public string BENE_ADDRESS_2 { get; set; } //BENE_ADDRESS_2
            public string BENE_CITY { get; set; } //BENE_CITY
            public string BENE_STATE { get; set; } //BENE_STATE
            public string BENE_ZIP_CODE { get; set; } //BENE_ZIP_CODE
            public string BENE_FOREIGN_ZIP_CODE { get; set; } //BENE_FOREIGN_ZIP_CODE
            public string ACTIVE_BENE_FLAG { get; set; } //ACTIVE_BENE_FLAG

        }
    }
}
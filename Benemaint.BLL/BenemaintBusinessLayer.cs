using Benemaint.DLL;
using Benemaint.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using static Benemaint.Model.ValicModel;

namespace Benemaint.BLL
{
    
    public class BenemaintBusinessLayer
    {
        CommonUtilities utils = new CommonUtilities();

        BenemaintDataAccess BenemaintDLL = new BenemaintDataAccess();

    

    

        public DataTable GetInfo(string ssn,string ssnType)
        {

            String BenemaintConn = ConfigurationManager.ConnectionStrings["ValicBenemaint"].ToString();
            DataTable dt = new DataTable();


            dt = BenemaintDLL.GetInfo(ssn, ssnType, BenemaintConn, "SSADMIN.BENEFICIARY_PACKAGE.sp_GetAccts");

            return dt;

        }

        public DataTable GetBeneInfo(string ssn, string ssnType,string acctNo)
        {
            String BenemaintConn = ConfigurationManager.ConnectionStrings["ValicBenemaint"].ToString();
            DataTable dt = new DataTable();

            dt = BenemaintDLL.GetBeneInfo(ssn, ssnType,acctNo, BenemaintConn, "SSADMIN.BENEFICIARY_PACKAGE.sp_GetBeneCurr");

            return dt;

        }

        public string InsertBeneInfo(BeneInfo beneInfo)
        {

            String BenemaintConn = ConfigurationManager.ConnectionStrings["ValicBenemaint"].ToString();
            DataTable dt = new DataTable();
            
           string ret = BenemaintDLL.InsertBeneinfo(beneInfo, BenemaintConn, "SSADMIN.BENEFICIARY_PACKAGE.sp_InsertBeneInfo");

            return ret;

        }

      


        public string UpdateBeneInfo(string ssn, string acctno)
        {

            String BenemaintConn = ConfigurationManager.ConnectionStrings["ValicBenemaint"].ToString();
            DataTable dt = new DataTable();

            string ret = BenemaintDLL.UpdateBeneInfo(ssn,acctno, BenemaintConn, "SSADMIN.BENEFICIARY_PACKAGE.sp_UpdateBeneInfo");

            return ret;

        }


    }
}
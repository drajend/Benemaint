using Benemaint.Utilities;
using Benemaint.Model;
using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using static Benemaint.Model.ValicModel;

namespace Benemaint.DLL
{
    public class BenemaintDataAccess
    {
       
             

        public DataTable GetInfo(string ssn, string ssnType ,string conn, string proc)
        {
            DataTable dt = new DataTable();
            string connectionString = conn;

            OracleConnection oConn = new OracleConnection(connectionString);

            try
            {
                oConn.Open();
                OracleCommand oCommand = new OracleCommand(proc, oConn);
                //OracleCommand oCommand = new OracleCommand("SSADMIN.AWD_INDEXING_PACKAGE.ValidateSSN", oConn);
                oCommand.CommandType = System.Data.CommandType.StoredProcedure;

                
                OracleParameter oParamSSN = new OracleParameter("SSN", OracleDbType.Char, 9);
                oParamSSN.Direction = System.Data.ParameterDirection.Input;
                oParamSSN.Value = ssn;
                oCommand.Parameters.Add(oParamSSN);

                OracleParameter oParamSSNType= new OracleParameter("SSN_TYPE", OracleDbType.Char, 9);
                oParamSSNType.Direction = System.Data.ParameterDirection.Input;
                oParamSSNType.Value = ssnType;
                oCommand.Parameters.Add(oParamSSNType);


                OracleParameter oParamOut = new OracleParameter("io_cursor", OracleDbType.RefCursor);
                oParamOut.Direction = System.Data.ParameterDirection.Output;
                oCommand.Parameters.Add(oParamOut);

                OracleDataReader dataReader = oCommand.ExecuteReader();
                dt.Load(dataReader);



                return dt;

            }
            catch (Exception ex)
            {
                return dt;
            }

            finally
            {
                oConn.Close();
            }

        }


        public DataTable GetBeneInfo(string ssn, string ssnType, string acctNo, string conn, string proc)
        {
            DataTable dt = new DataTable();
            string connectionString = conn;

            OracleConnection oConn = new OracleConnection(connectionString);

            try
            {
                oConn.Open();
                OracleCommand oCommand = new OracleCommand(proc, oConn);
                //OracleCommand oCommand = new OracleCommand("SSADMIN.AWD_INDEXING_PACKAGE.ValidateSSN", oConn);
                oCommand.CommandType = System.Data.CommandType.StoredProcedure;


                OracleParameter oParamAcctNo = new OracleParameter("p_Account", OracleDbType.Char, 9);
                oParamAcctNo.Direction = System.Data.ParameterDirection.Input;
                oParamAcctNo.Value = acctNo;
                oCommand.Parameters.Add(oParamAcctNo);

                OracleParameter oParamSSN = new OracleParameter("p_SSN", OracleDbType.Char, 9);
                oParamSSN.Direction = System.Data.ParameterDirection.Input;
                oParamSSN.Value = ssn;
                oCommand.Parameters.Add(oParamSSN);

                OracleParameter oParamSSNType = new OracleParameter("ssn_type", OracleDbType.Char, 9);
                oParamSSNType.Direction = System.Data.ParameterDirection.Input;
                oParamSSNType.Value = ssnType;
                oCommand.Parameters.Add(oParamSSNType);


                OracleParameter oParamOut = new OracleParameter("io_cursor", OracleDbType.RefCursor);
                oParamOut.Direction = System.Data.ParameterDirection.Output;
                oCommand.Parameters.Add(oParamOut);

                OracleDataReader dataReader = oCommand.ExecuteReader();
                dt.Load(dataReader);
                
                return dt;

            }
            catch (Exception ex)
            {
                return dt;
            }

            finally
            {
                oConn.Close();
            }

        }

        public string InsertBeneinfo(BeneInfo beneInfo, string conn, string proc)
        {
            DataTable dt = new DataTable();
            string connectionString = conn;
            string rowsUpdated = "";
            OracleConnection oConn = new OracleConnection(connectionString);

            try
            {
                oConn.Open();
                OracleCommand oCommand = new OracleCommand(proc, oConn);
                //OracleCommand oCommand = new OracleCommand("SSADMIN.AWD_INDEXING_PACKAGE.ValidateSSN", oConn);
                oCommand.CommandType = System.Data.CommandType.StoredProcedure;


                OracleParameter oParamSSN = new OracleParameter("ssn", OracleDbType.Varchar2, 9);
                oParamSSN.Direction = System.Data.ParameterDirection.Input;
                oParamSSN.Value = beneInfo.SSN;
                oCommand.Parameters.Add(oParamSSN);

                OracleParameter oParamSSNType = new OracleParameter("ssn_type", OracleDbType.Varchar2, 1);
                oParamSSNType.Direction = System.Data.ParameterDirection.Input;
                oParamSSNType.Value = beneInfo.SSN_Type;
                oCommand.Parameters.Add(oParamSSNType);


                OracleParameter oParamAcctNo = new OracleParameter("acctnum", OracleDbType.Varchar2, 7);
                oParamAcctNo.Direction = System.Data.ParameterDirection.Input;
                oParamAcctNo.Value = beneInfo.AcctNum;
                oCommand.Parameters.Add(oParamAcctNo);


                OracleParameter oParamcrda_benedte = new OracleParameter("crda_benedte", OracleDbType.Varchar2, 26);
                oParamcrda_benedte.Direction = System.Data.ParameterDirection.Input;
                oParamcrda_benedte.Value = beneInfo.CRDA_BeneDte;
                oCommand.Parameters.Add(oParamcrda_benedte);

                OracleParameter oParamBene_type = new OracleParameter("bene_type", OracleDbType.Varchar2, 1);
                oParamBene_type.Direction = System.Data.ParameterDirection.Input;
                oParamBene_type.Value = beneInfo.Bene_Type;
                oCommand.Parameters.Add(oParamBene_type);


                OracleParameter oParamBene_ssn = new OracleParameter("bene_ssn", OracleDbType.Varchar2, 9);
                oParamBene_ssn.Direction = System.Data.ParameterDirection.Input;
                oParamBene_ssn.Value = beneInfo.Bene_SSN;
                oCommand.Parameters.Add(oParamBene_ssn);

                OracleParameter oParamBene_name = new OracleParameter("bene_name", OracleDbType.Varchar2, 40);
                oParamBene_name.Direction = System.Data.ParameterDirection.Input;
                oParamBene_name.Value = beneInfo.Bene_Name;
                oCommand.Parameters.Add(oParamBene_name);

                OracleParameter oParamBene_dob = new OracleParameter("bene_dob", OracleDbType.Varchar2, 10);
                oParamBene_dob.Direction = System.Data.ParameterDirection.Input;
                oParamBene_dob.Value = beneInfo.Bene_DOB;
                oCommand.Parameters.Add(oParamBene_dob);
                
                OracleParameter oParamRelationship = new OracleParameter("relationship", OracleDbType.Varchar2, 15);
                oParamRelationship.Direction = System.Data.ParameterDirection.Input;
                oParamRelationship.Value = beneInfo.Relationship;
                oCommand.Parameters.Add(oParamRelationship);


                OracleParameter oParamBene_per = new OracleParameter("bene_per", OracleDbType.Varchar2, 3);
                oParamBene_per.Direction = System.Data.ParameterDirection.Input;
                oParamBene_per.Value = beneInfo.bene_per; //percentage
                oCommand.Parameters.Add(oParamBene_per);

                OracleParameter oParamMulti_bene = new OracleParameter("multi_bene", OracleDbType.Varchar2, 1);
                oParamMulti_bene.Direction = System.Data.ParameterDirection.Input;
                oParamMulti_bene.Value = beneInfo.Multi_Bene;
                oCommand.Parameters.Add(oParamMulti_bene);


                OracleParameter oParamUserid = new OracleParameter("userid", OracleDbType.Varchar2, 10);
                oParamUserid.Direction = System.Data.ParameterDirection.Input;
                oParamUserid.Value = beneInfo.userid;
                oCommand.Parameters.Add(oParamUserid);

                OracleParameter oParamBene_add1 = new OracleParameter("bene_add1", OracleDbType.Varchar2, 30);
                oParamBene_add1.Direction = System.Data.ParameterDirection.Input;
                oParamBene_add1.Value = beneInfo.bene_add1;
                oCommand.Parameters.Add(oParamBene_add1);

                OracleParameter oParamBene_add2 = new OracleParameter("bene_add2", OracleDbType.Varchar2, 30);
                oParamBene_add2.Direction = System.Data.ParameterDirection.Input;
                oParamBene_add2.Value = beneInfo.bene_add2;
                oCommand.Parameters.Add(oParamBene_add2);

                OracleParameter oParamBene_city = new OracleParameter("bene_city", OracleDbType.Varchar2, 19);
                oParamBene_city.Direction = System.Data.ParameterDirection.Input;
                oParamBene_city.Value = beneInfo.bene_city;
                oCommand.Parameters.Add(oParamBene_city);

                OracleParameter oParamBene_state = new OracleParameter("bene_state", OracleDbType.Varchar2, 2);
                oParamBene_state.Direction = System.Data.ParameterDirection.Input;
                oParamBene_state.Value = beneInfo.bene_state;
                oCommand.Parameters.Add(oParamBene_state);
                
                OracleParameter oParamBene_zip = new OracleParameter("bene_zip", OracleDbType.Varchar2, 9);
                oParamBene_zip.Direction = System.Data.ParameterDirection.Input;
                oParamBene_zip.Value = beneInfo.bene_zip;
                oCommand.Parameters.Add(oParamBene_zip);

                OracleParameter oParamBene_fzip = new OracleParameter("bene_fzip", OracleDbType.Varchar2, 11);
                oParamBene_fzip.Direction = System.Data.ParameterDirection.Input;
                oParamBene_fzip.Value = beneInfo.bene_fzip; //percentage
                oCommand.Parameters.Add(oParamBene_fzip);

                OracleParameter oParamActive_bene = new OracleParameter("active_bene", OracleDbType.Char, 1);
                oParamActive_bene.Direction = System.Data.ParameterDirection.Input;
                oParamActive_bene.Value = beneInfo.Active_Bene;
                oCommand.Parameters.Add(oParamActive_bene);
                
                rowsUpdated = oCommand.ExecuteNonQuery().ToString();

                //OracleDataReader dataReader = oCommand.ExecuteReader();
                //dt.Load(dataReader);

            }
            catch (Exception ex)
            {
                return rowsUpdated;
            }

            finally
            {
                oConn.Close();
            }
            return rowsUpdated;
        }


        public string UpdateBeneInfo(string ssn, string accountNo, string conn, string proc)
        {

            DataTable dt = new DataTable();
            string connectionString = conn;
            string retval = "";
            OracleConnection oConn = new OracleConnection(connectionString);

            try
            {
                oConn.Open();
                OracleCommand oCommand = new OracleCommand(proc, oConn);
                //OracleCommand oCommand = new OracleCommand("SSADMIN.AWD_INDEXING_PACKAGE.ValidateSSN", oConn);
                oCommand.CommandType = System.Data.CommandType.StoredProcedure;



                OracleParameter oParamAcctnum = new OracleParameter("acctnum", OracleDbType.Char, 7);
                oParamAcctnum.Direction = System.Data.ParameterDirection.Input;
                oParamAcctnum.Value = accountNo;
                oCommand.Parameters.Add(oParamAcctnum);

                OracleParameter oParamSSN = new OracleParameter("ssn", OracleDbType.Char, 9);
                oParamSSN.Direction = System.Data.ParameterDirection.Input;
                oParamSSN.Value = ssn;
                oCommand.Parameters.Add(oParamSSN);

                

                OracleParameter oParamOut = new OracleParameter("retval", OracleDbType.Int32);
                oParamOut.Direction = System.Data.ParameterDirection.Output;
                oCommand.Parameters.Add(oParamOut);

                //OracleDataReader dataReader = oCommand.ExecuteReader();
                //dt.Load(dataReader);

                oCommand.ExecuteNonQuery();

                retval = oParamOut.Value.ToString();
                //retval = oCommand.ExecuteNonQuery().ToString();
                //oCommand.ExecuteScalar();

                return retval;

            }
            catch (Exception ex)
            {
                return retval;
            }

            finally
            {
                oConn.Close();
            }
        }

    }

  
}
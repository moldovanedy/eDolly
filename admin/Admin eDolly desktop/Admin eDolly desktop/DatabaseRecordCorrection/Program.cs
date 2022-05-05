using MySql.Data.MySqlClient;
using System;

namespace DatabaseRecordCorrection
{
    internal class Program
    {

        private static void Main()
        {
            Console.WriteLine("Bine ati venit!");

            try
            {
                string connStr = $"server=localhost;user=root;database=edolly;port=3306;password=DollyBelladb04";

                MySqlConnection conn = new MySqlConnection(connStr);
                conn.Open();

                for (int i = 0; i < 1500; i++)
                {
                    string sql = $"SELECT BIN_TO_UUID(id) id, Reviews FROM products LIMIT {i + 1}, 1;";
                    MySqlCommand cmd = new MySqlCommand(sql, conn);
                    MySqlDataReader rdr = cmd.ExecuteReader();

                    string id = "", reviews = "";
                    float rating = 0;

                    //read the data
                    while (rdr.Read())
                    {
                        id = (string)rdr[0];
                        reviews = (string)rdr[1];


                    }
                    rdr.Close();

                    string sql2 = $"UPDATE products SET Rating = '{rating}' WHERE id = UUID_TO_BIN('{id}')";
                    MySqlCommand command = new MySqlCommand(sql2, conn);
                    int numberOfRowsAffected = command.ExecuteNonQuery();
                    Console.WriteLine("Nr: " + i);
                }

                Console.ReadKey();
            }
            catch (Exception ex)
            {
                Console.WriteLine("A aparut o eroare neasteptata. Va rugam raportati aceasta problema personalului IT si furnizati urmatoarele informatii tehnice:");
                Console.WriteLine("Eroare: \n" + ex);
                Console.ReadKey();
            }
        }
    }
}

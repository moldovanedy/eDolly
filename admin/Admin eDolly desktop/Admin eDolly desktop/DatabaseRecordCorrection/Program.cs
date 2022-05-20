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

                //remained at 1290
                for (int i = 1290; i < 1500; i++)
                {
                    string sql = $"SELECT BIN_TO_UUID(id) id, Reviews FROM products LIMIT {i + 1}, 1;";
                    MySqlCommand cmd = new MySqlCommand(sql, conn);
                    MySqlDataReader rdr = cmd.ExecuteReader();

                    string id = "", reviews = "";
                    double rating = 0;

                    //read the data
                    while (rdr.Read())
                    {
                        id = (string)rdr[0];
                        reviews = (string)rdr[1];
                        bool isDone = false;
                        int sum = 0, oneRating = 0, length = 0;
                        while (!isDone)
                        {
                            int x = reviews.IndexOf("}");
                            string rev = reviews.Substring(x - 1, 1);
                            reviews = reviews.Substring(x + 1);
                            try
                            {
                                int.TryParse(rev, out oneRating);
                            }
                            catch (FormatException)
                            {
                                Console.WriteLine("Ehe");
                            }

                            sum += oneRating;
                            if(oneRating != 0)
                            {
                                length++;
                            }
                            if (!reviews.Contains("}"))
                            {
                                isDone = true;
                                double result = (double)sum / (double)length;
                                rating = Math.Round(result, 2);
                            }
                        }
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

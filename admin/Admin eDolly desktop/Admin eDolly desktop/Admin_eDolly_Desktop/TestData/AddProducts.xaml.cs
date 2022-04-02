using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace TestDataGenerator
{
    public partial class AddProducts : Page
    {
        
        private bool isRandomCategory;
        private bool hasThrownError = false;
        System.Timers.Timer timer;

        public int MinPhotos { get; private set; }
        public int MaxPhotos { get; private set; }
        public int MinReviews { get; private set; }
        public int MaxReviews { get; private set; }
        // Category este aici deoarece proprietatea nu se poate modifica pentru clasa GenerateProduct
        public string Category { get; set; }

        readonly HttpClient client = new HttpClient();

        public AddProducts()
        {
            InitializeComponent();
        }

        #region ValidateData
        private void NrMinimPoze_KeyUp(object sender, KeyEventArgs e)
        {
            try
            {
                MinPhotos = Convert.ToInt32(NrMinimPoze.Text);

                if (MinPhotos > Convert.ToInt32(NrMaximPoze.Text) || MinPhotos <= 0 || MinPhotos > 15)
                {
                    ErrPhotos.Visibility = Visibility.Visible;
                    GenerateButton.IsEnabled = false;
                }
                else
                {
                    ErrPhotos.Visibility = Visibility.Hidden;
                    GenerateButton.IsEnabled = true;
                }
            }
            catch (Exception)
            {
                ErrPhotos.Visibility = Visibility.Visible;
                GenerateButton.IsEnabled = false;
            }
        }

        private void NrMaximPoze_KeyUp(object sender, KeyEventArgs e)
        {
            try
            {
                MaxPhotos = Convert.ToInt32(NrMaximPoze.Text);

                if (MaxPhotos < Convert.ToInt32(NrMinimPoze.Text) || MaxPhotos <= 0 || MaxPhotos > 15)
                {
                    ErrPhotos.Visibility = Visibility.Visible;
                    GenerateButton.IsEnabled = false;
                }
                else
                {
                    ErrPhotos.Visibility = Visibility.Hidden;
                    GenerateButton.IsEnabled = true;
                }
            }
            catch (Exception)
            {
                ErrPhotos.Visibility = Visibility.Visible;
                GenerateButton.IsEnabled = false;
            }
        }

        private void NrMinimRecenzii_KeyUp(object sender, KeyEventArgs e)
        {
            try
            {
                MinReviews = Convert.ToInt32(NrMinimRecenzii.Text);

                if (MinReviews > Convert.ToInt32(NrMaximRecenzii.Text) || MinReviews < 0 || MinReviews > 100)
                {
                    ErrReviews.Visibility = Visibility.Visible;
                    GenerateButton.IsEnabled = false;
                }
                else
                {
                    ErrReviews.Visibility = Visibility.Hidden;
                    GenerateButton.IsEnabled = true;
                }
            }
            catch (Exception)
            {
                ErrReviews.Visibility = Visibility.Visible;
                GenerateButton.IsEnabled = false;
            }
        }

        private void NrMaximRecenzii_KeyUp(object sender, KeyEventArgs e)
        {
            try
            {
                MaxReviews = Convert.ToInt32(NrMaximRecenzii.Text);

                if (MaxReviews < Convert.ToInt32(NrMinimRecenzii.Text) || MaxReviews < 0 || MaxReviews > 100)
                {
                    ErrReviews.Visibility = Visibility.Visible;
                    GenerateButton.IsEnabled = false;
                }
                else
                {
                    ErrReviews.Visibility = Visibility.Hidden;
                    GenerateButton.IsEnabled = true;
                }
            }
            catch (Exception)
            {
                ErrReviews.Visibility = Visibility.Visible;
                GenerateButton.IsEnabled = false;
            }
        }
        #endregion

        private void GenerateButton_Click(object sender, RoutedEventArgs e)
        {
            timer = new System.Timers.Timer(2000)
            {
                Enabled = true
            };
            timer.Elapsed += MakeRequest;
            StopButton.IsEnabled = true;
            GenerateButton.IsEnabled = false;
        }

        private void StopButton_Click(object sender, RoutedEventArgs e)
        {
            timer.Stop();
            timer.Dispose();
            GenerateButton.IsEnabled = true;
            StopButton.IsEnabled = false;
        }

        private async void MakeRequest(object sender, EventArgs e)
        {
            GenerateTestData.GenerateProduct product = new GenerateTestData.GenerateProduct();
            Dispatcher.Invoke(() =>
            {
                product.CreateProduct(Convert.ToInt32(NrMinimRecenzii.Text), Convert.ToInt32(NrMaximRecenzii.Text));

                //daca cumva nu se selecteaza o categorie...
                ComboBoxItem cbi = (ComboBoxItem)Categorie.SelectedItem;

                if (isRandomCategory == true || cbi == null)
                {
                    SetCategory();
                }
            });

            //deoarece cererea se trimite, server-ul proceseaza cererea corect, dar HttpResponseMessage anuleaza Task si apare exceptia "A task was cancelled" (se asteapta ca in Postman)
            try
            {
                //va gasi fisierul de date (Base64Images.json)
                string imageData;
                string folder = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory) + "\\Resources\\";
                string filter = "*.json";
                string[] files = Directory.GetFiles(folder, filter);

                string path = files[0];

                if (File.Exists(path))
                {
                    StreamReader fileReader = new StreamReader(path);
                    imageData = fileReader.ReadToEnd();
                }
                else
                {
                    Debug.WriteLine("Imaginile nu sunt disponibile!");
                    imageData = "data:image/gif;base64,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";
                }

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                JObject jsonData = (JObject)JsonConvert.DeserializeObject(imageData);

                imageData = null;

                string img = "";
                Random random = new Random();
                Dispatcher.Invoke(() =>
                {

                    int x = random.Next(Convert.ToInt32(NrMinimPoze.Text), Convert.ToInt32(NrMaximPoze.Text) + 1);

                    string jsonKey = Category.Replace(' ', '_').ToLowerInvariant(); //transformam Category in formatul din fisierul de date
                    StringBuilder sb = new StringBuilder();
                    for (int i = 1; i <= x; i++)
                    {
                        if(i == x)
                        {
                            sb.Append("\"{" + jsonData[jsonKey + i].Value<string>() + "}\"");
                        }
                        else
                        {
                            sb.Append("\"{" + jsonData[jsonKey + i].Value<string>() + "}\",");
                        }
                    }
                    img = sb.ToString();
                });

                string dataSent = $"{{\"name\": \"{product.Name}\", \"price\":{product.Price}, \"stock\":{product.Stock},\"category\":\"{Category}\", \"description\":\"{product.Description}\", \"specifications\":\"{product.Specifications}\", \"reviews\":\"{product.Reviews}\", \"files\": [{img}]}}";
                StringContent content = new StringContent(dataSent, Encoding.UTF8, "application/json");

                jsonData = null;
                dataSent = null;

                HttpResponseMessage response = await client.PostAsync("http://localhost:5000/products/addFromApps", content).ConfigureAwait(false);
                string responseString = await response.Content.ReadAsStringAsync();
            }
            catch (Exception err)
            {
                if (!(err.ToString().Contains("A task was canceled")) && hasThrownError == false)
                {
                    hasThrownError = true;
                    MessageBox.Show("Oops! S-a produs o eroare neașteptată! Reporniți aplicația pentru a rezolva problema." + Environment.NewLine + "Detalii tehnice: " + err.Message , "Eroare!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                //Debug.WriteLine("Eroare: " + err);
            }
        }

        private void SetCategory()
        {
            string[] categories = new string[] { "Telefoane", "Accesorii telefoane", "Tablete", "Telefoane resigilate", "Laptop-uri", "Accesorii laptop-uri", "Laptop-uri resigilate", "Desktop-uri", "Periferice", "Componente", "Software", "Imprimante și scanere", "Desktop-uri Resigilate", "Televizoare", "Accesorii televizoare", "Televizoare resigilate", "Aparate foto", "Accesorii foto", "Camere video", "Aparate foto Resigilate", "Aparate frigorifice", "Mașini de spălat", "Aragazuri", "Cuptoare", "Cuptoare cu microunde", "Electrocasnice Resigilate" };
            Random random = new Random();
            Category = categories[random.Next(categories.Length)];
        }

        private void Categorie_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ComboBoxItem cbi = (ComboBoxItem)Categorie.SelectedItem;
            string selectedCategory = cbi.Content.ToString();
            if (selectedCategory.Contains("Oricare"))
            {
                isRandomCategory = true;
            }
            Category = selectedCategory;
        }
    }
}

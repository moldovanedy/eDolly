using System.Globalization;
using System.Threading;
using System.Windows;

namespace TestDataGenerator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    /// 
    /// <returns>
    ///     HttpClient httpClient = new HttpClient();
    ///     MultipartFormDataContent form = new MultipartFormDataContent();

    ///     form.Add(new StringContent(username), "username");
    ///     form.Add(new StringContent(useremail), "email");
    ///     form.Add(new StringContent(password), "password");            
    ///     form.Add(new ByteArrayContent(file_bytes, 0, file_bytes.Length), "profile_pic", "hello1.jpg");
    ///     HttpResponseMessage response = await httpClient.PostAsync("PostUrl", form);

    ///     response.EnsureSuccessStatusCode();
    ///     httpClient.Dispose();
    ///     string sd = response.Content.ReadAsStringAsync().Result;
    /// </returns>
    public partial class MainWindow : Window
    {

        public MainWindow()
        {
            InitializeComponent();
            CultureInfo customCulture = (CultureInfo)Thread.CurrentThread.CurrentCulture.Clone();
            customCulture.NumberFormat.NumberDecimalSeparator = ".";

            Thread.CurrentThread.CurrentCulture = customCulture;
        }
    }
}

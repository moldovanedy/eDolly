using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;

namespace TestDataGenerator.TestData
{
    /// <summary>
    /// Interaction logic for TestDataGeneratorPage.xaml
    /// </summary>
    public partial class TestDataGeneratorPage : Page
    {
        public TestDataGeneratorPage()
        {
            InitializeComponent();
        }

        private void ProductGenerator_Click(object sender, RoutedEventArgs e)
        {
            NavigationService nav = NavigationService.GetNavigationService(this);
            nav.Navigate(new Uri("/TestData/AddProducts.xaml", UriKind.RelativeOrAbsolute));
        }
    }
}

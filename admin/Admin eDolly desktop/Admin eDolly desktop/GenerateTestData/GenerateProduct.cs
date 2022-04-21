using System;
using System.Text;

namespace GenerateTestData
{
    public class GenerateProduct
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public string Reviews { get; set; }

        readonly Random rand = new Random();

        public void CreateProduct(int minReviews = 0, int maxReviews = 100)
        {
            GenerateName();
            GeneratePrice();
            GenerateStock();
            GenerateDescription();
            GenerateSpecifications();
            GenerateReviews(minReviews, maxReviews);
        }

        public void GenerateName()
        {
            string name = LoremNET.Lorem.Words(6, 18);
            Name = name;
        }

        public void GeneratePrice()
        {
            double priceWithoutDecimals = rand.Next(5, 10000);
            double priceFractionaryPart = rand.NextDouble();
            double price = priceWithoutDecimals + Math.Round(priceFractionaryPart, 2);
            Price = price;
        }

        public void GenerateStock()
        {
            int stock = rand.Next(30, 25000);
            Stock = stock;
        }

        public void GenerateDescription()
        {
            int paragraphs = rand.Next(4, 10);
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i < paragraphs; i++)
            {
                string descriptionParagraph = LoremNET.Lorem.Paragraph(4, 28, 4, 18);
                sb.Append(descriptionParagraph);
            }
            string description = sb.ToString();
            Description = description;
        }

        public void GenerateSpecifications()
        {
            int numberOfSpecs = rand.Next(20, 50);
            StringBuilder sb = new StringBuilder(null);
            int i = 1;
            while (i <= numberOfSpecs)
            {
                int numberOfValues = rand.Next(1, 3);
                string key = LoremNET.Lorem.Words(1, 3, false);
                sb.Append(key + ":");
                string value;
                for (int j = 1; j <= numberOfValues; j++)
                {
                    value = LoremNET.Lorem.Words(1, false);
                    if (j == numberOfValues)
                    {
                        sb.Append(value + ";");
                    }
                    else
                    {
                        sb.Append(value + ",");
                    }
                }
                i++;
            }
            Specifications = sb.ToString();
        }

        public void GenerateReviews(int minNumberOfReviews, int maxNumberOfReviews)
        {
            int numberOfReviews = rand.Next(minNumberOfReviews, maxNumberOfReviews + 1);
            StringBuilder sb = new StringBuilder("");
            for (int i = 0; i <= numberOfReviews; i++)
            {
                sb.Append($"[{LoremNET.Lorem.Words(2)}]:{{{{{rand.Next(1, 6)}}}{LoremNET.Lorem.Paragraph(4, 25, 2, 20)}}}"); //ex. [Popescu Ion]:{{5}Foarte bun produsul!}
            }
            Reviews = sb.ToString();
        }
    }
}

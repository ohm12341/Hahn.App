using System.Collections.Generic;

namespace Hahn.ApplicatonProcess.May2020.API.Models
{
    public class LinkCollectionWrapper<T> : LinkResourceBase
    {
        public List<T> Value { get; set; } = new List<T>();

        public LinkCollectionWrapper()
        {

        }

        public LinkCollectionWrapper(List<T> value)
        {
            Value = value;
        }
    }
}

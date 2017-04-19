using Orchard.UI.Resources;

namespace Bismarq.Frontend
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(ResourceManifestBuilder builder)
        {
            var manifest = builder.Add();
        }
    }
}
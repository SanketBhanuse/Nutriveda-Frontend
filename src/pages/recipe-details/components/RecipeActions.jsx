import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecipeActions = ({ recipe, onSave, onShare, onPrint }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(recipe, !isSaved);
    }
  };

  const handleShare = (platform) => {
    const url = window.location?.href;
    const text = `Check out this Ayurvedic recipe: ${recipe?.name}`;
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(recipe?.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    if (shareUrls?.[platform]) {
      window.open(shareUrls?.[platform], '_blank');
    }
    
    setShowShareMenu(false);
    if (onShare) {
      onShare(platform);
    }
  };

  const handlePrint = () => {
    window.print();
    if (onPrint) {
      onPrint();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
      <h3 className="font-medium text-foreground mb-4">Recipe Actions</h3>
      <div className="flex flex-wrap gap-3">
        <Button
          variant={isSaved ? "default" : "outline"}
          onClick={handleSave}
          iconName={isSaved ? "Heart" : "Heart"}
          iconPosition="left"
          iconSize={16}
          className={isSaved ? "text-primary-foreground" : ""}
        >
          {isSaved ? "Saved" : "Save Recipe"}
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowShareMenu(!showShareMenu)}
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
          >
            Share
          </Button>
          
          {showShareMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-elevated z-10">
              <div className="p-2">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="MessageCircle" size={16} className="text-green-500" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="Facebook" size={16} className="text-blue-500" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="Twitter" size={16} className="text-blue-400" />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="Mail" size={16} className="text-gray-500" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          onClick={handlePrint}
          iconName="Printer"
          iconPosition="left"
          iconSize={16}
        >
          Print
        </Button>

        <Button
          variant="outline"
          onClick={() => window.history?.back()}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
        >
          Back
        </Button>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Recipe ID: {recipe?.id}</span>
          <span className="text-muted-foreground">Last updated: {new Date()?.toLocaleDateString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeActions;
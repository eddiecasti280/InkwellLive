import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabaseClient';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  BookOpen, 
  PenTool, 
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ThemeToggle } from '../components/ui/theme-toggle';
import { UserMenu } from '../components/auth/UserMenu';
import { Feather } from 'lucide-react';

// DiceBear avatar seeds for selection
const dicebearSeeds = [
  'cat', 'dog', 'fox', 'owl', 'bear', 'koala', 'panda', 'lion', 'frog', 'bunny', 'tiger', 'monkey'
];

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

interface UserStats {
  total_stories: number;
  total_words: number;
  stories_this_month: number;
  words_this_month: number;
  average_words_per_story: number;
  longest_story: number;
  member_since_days: number;
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: '',
    website: '',
    location: ''
  });

  // Add state for selected avatar type
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadStats();
    }
  }, [user]);

  useEffect(() => {
    document.title = "Inkwell | Profile";
  }, []);

  useEffect(() => {
    // Set initial avatar selection based on profile
    if (profile?.avatar_url) {
      setSelectedAvatar(profile.avatar_url);
    } else {
      setSelectedAvatar(null);
    }
  }, [profile]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          username: data.username || '',
          bio: data.bio || '',
          website: data.website || '',
          location: data.location || ''
        });
      } else {
        // Create profile if it doesn't exist
        await createProfile();
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: user?.id,
            email: user?.email,
            full_name: user?.user_metadata?.full_name || '',
            username: user?.email?.split('@')[0] || '',
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        username: data.username || '',
        bio: data.bio || '',
        website: data.website || '',
        location: data.location || ''
      });
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const loadStats = async () => {
    try {
      // This would typically come from your database
      // For now, we'll use mock data
      const mockStats: UserStats = {
        total_stories: 12,
        total_words: 45000,
        stories_this_month: 3,
        words_this_month: 8500,
        average_words_per_story: 3750,
        longest_story: 12000,
        member_since_days: Math.floor((Date.now() - new Date(user?.created_at || '').getTime()) / (1000 * 60 * 60 * 24))
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // If a DiceBear avatar is selected, use its URL; otherwise, use uploaded image
      const avatarUrlToSave = selectedAvatar || profile?.avatar_url || null;
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          avatar_url: avatarUrlToSave,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      await loadProfile();
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await loadProfile();
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar>
        <Link
          to="/dashboard"
          className="text-warm-700 hover:text-warm-800 transition-colors dark:text-warm-300 dark:hover:text-warm-200"
        >
          Dashboard
        </Link>
        <ThemeToggle />
        {user && <UserMenu />}
      </Navbar>
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home button */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm border border-border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      {selectedAvatar ? (
                        <AvatarImage src={selectedAvatar} alt={profile?.full_name} />
                      ) : (
                        <AvatarFallback className="text-2xl p-0 bg-transparent">
                          <img
                            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(profile?.username || user?.email || user?.id || 'user')}`}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {isEditing && (
                      <>
                        <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (event) => {
                              await handleAvatarUpload(event);
                              // After upload, set selectedAvatar to the uploaded image
                              if (profile?.avatar_url) setSelectedAvatar(profile.avatar_url);
                            }}
                            className="hidden"
                            disabled={uploadingAvatar}
                          />
                        </label>
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {dicebearSeeds.map((seed) => {
                            const url = `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
                            return (
                              <button
                                key={seed}
                                type="button"
                                className={`border-2 rounded-full p-1 transition-all ${selectedAvatar === url ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
                                onClick={() => {
                                  setSelectedAvatar(url);
                                }}
                              >
                                <img src={url} alt={seed} className="w-12 h-12 rounded-full" />
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                  <CardTitle className="text-xl">
                    {profile?.full_name || 'Anonymous Writer'}
                  </CardTitle>
                  <CardDescription>
                    @{profile?.username || user?.email?.split('@')[0]}
                  </CardDescription>
                  {profile?.location && (
                    <p className="text-sm text-muted-foreground">{profile.location}</p>
                  )}
                </CardHeader>
                <CardContent>
                  {profile?.bio && (
                    <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Member since {formatDate(user?.created_at || '')}</span>
                    </div>
                    {profile?.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <a 
                          href={profile.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {profile.website}
                        </a>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="mt-4 text-xs text-muted-foreground text-center">
                      You can upload your own image or select a Shapes avatar above.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your profile information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Where are you from?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        disabled={!isEditing}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            full_name: profile?.full_name || '',
                            username: profile?.username || '',
                            bio: profile?.bio || '',
                            website: profile?.website || '',
                            location: profile?.location || ''
                          });
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Statistics */}
              {stats && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Writing Statistics
                    </CardTitle>
                    <CardDescription>
                      Your writing journey at a glance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stats.total_stories}</div>
                        <div className="text-sm text-muted-foreground">Total Stories</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stats.total_words.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Words</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stats.stories_this_month}</div>
                        <div className="text-sm text-muted-foreground">This Month</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stats.average_words_per_story.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Avg. Words</div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{stats.longest_story.toLocaleString()} words</div>
                          <div className="text-sm text-muted-foreground">Longest story</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <PenTool className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{stats.words_this_month.toLocaleString()} words</div>
                          <div className="text-sm text-muted-foreground">This month</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{stats.member_since_days} days</div>
                          <div className="text-sm text-muted-foreground">Member since</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
} 
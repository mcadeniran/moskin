type FeaturedProduct = {
  id: number;
  title: string;
  desc: string;
  feature?: string;
  ingredients?: string;
  img: string;
  price: number;
};

type FeaturedProducts = FeaturedProduct[];

export const featuredProducts: FeaturedProducts = [
  {
    id: 1,
    title: 'Activated Stretch Mark Kit',
    desc: 'Activated stretch mark kit is the mixture of the skin glow butter+  stretch mark oil+ stretch mark fader recommended for those who desire to get rid of stretch marks on a budget, it gets the job done as much as the full kit without side effect',
    img: '/mos/asmk.JPG',
    feature:
      'Visible result two to three weeks or less depending on how receptive you skin is to the treatment and how long the marks had stayed',
    ingredients:
      'shea butter, cocoa butter, almond oil frankincense oil, snail slime',
    price: 8500,
  },
  {
    id: 2,
    title: 'Aloe Face Polish',
    desc: 'Activated stretch mark kit is the mixture of the skin glow butter+  stretch mark oil+ stretch mark fader recommended for those who desire to get rid of stretch marks on a budget, it gets the job done as much as the full kit without side effect',
    img: '/mos/afp.jpg',
    feature:
      'Visible result two to three weeks or less depending on how receptive you skin is to the treatment and how long the marks had stayed',
    ingredients:
      'shea butter, cocoa butter, almond oil frankincense oil, snail slime',
    price: 8500,
  },
  {
    id: 3,
    title: 'Clarify Soap',
    desc: 'Activated stretch mark kit is the mixture of the skin glow butter+  stretch mark oil+ stretch mark fader recommended for those who desire to get rid of stretch marks on a budget, it gets the job done as much as the full kit without side effect',
    img: '/mos/cs.jpg',
    feature:
      'Visible result two to three weeks or less depending on how receptive you skin is to the treatment and how long the marks had stayed',
    ingredients:
      'shea butter, cocoa butter, almond oil frankincense oil, snail slime',
    price: 8500,
  },
  {
    id: 4,
    title: 'Face Mask',
    desc: 'Activated stretch mark kit is the mixture of the skin glow butter+  stretch mark oil+ stretch mark fader recommended for those who desire to get rid of stretch marks on a budget, it gets the job done as much as the full kit without side effect',
    img: '/mos/fm.jpg',
    feature:
      'Visible result two to three weeks or less depending on how receptive you skin is to the treatment and how long the marks had stayed',
    ingredients:
      'shea butter, cocoa butter, almond oil frankincense oil, snail slime',
    price: 8500,
  },
  {
    id: 5,
    title: 'Lightening Set with luminous bar',
    desc: 'Activated stretch mark kit is the mixture of the skin glow butter+  stretch mark oil+ stretch mark fader recommended for those who desire to get rid of stretch marks on a budget, it gets the job done as much as the full kit without side effect',
    img: '/mos/lswlb.jpg',
    feature:
      'Visible result two to three weeks or less depending on how receptive you skin is to the treatment and how long the marks had stayed',
    ingredients:
      'shea butter, cocoa butter, almond oil frankincense oil, snail slime',
    price: 8500,
  },
];

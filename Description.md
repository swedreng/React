# React
# Create program
npm install
# Runnig
npm start
#create
npm install --save react-placeholder // react eklentisi
import ReactPlaceholder from 'react-placeholder';
bu kısmı  css dosyana ekle
 /baslangıc
.show-loading-animation {
  &.rect-shape,
  &.round-shape,
  &.text-row,
  .rect-shape,
  .round-shape,
  .text-row {
    animation: react-placeholder-pulse 1.5s infinite;
  }
}
@keyframes react-placeholder-pulse {
  0% {
    opacity: .6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .6;
  }
}
/bitis
yarn add react-loadable // page uploading 
import Loadable from 'react-loadable';

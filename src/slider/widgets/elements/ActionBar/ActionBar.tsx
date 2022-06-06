import React, { useCallback, useState } from 'react';
import { Button } from 'react-vant';
import { useSliderContext } from '../../../utils/SliderContext';
import { SliderWidgetProps, SliderEffectReactElement } from '../../../types/UI';
import { LocaleMessageKey } from '../../../utils/language';
import { PermissionKey } from '../../../utils/permission';

import styles from './ActionBar.module.css';
import { useEffectElement } from '../../../hooks/useEffectElement';

interface ActionBarProps extends SliderWidgetProps {
  preSlideEffect?: SliderEffectReactElement;
  nextSlideEffect?: SliderEffectReactElement;
  submitEffect?: SliderEffectReactElement;
}

const EventNames = {
  OnNextSlide: "OnNextSlide",
  OnPreSlide: "OnPreSlide",
  OnSubmitSlider: "OnSubmitSlider"
}

function ActionBar(props: ActionBarProps) {
  const sliderContext = useSliderContext();
  const i18nMessageBundle = sliderContext.i18nMessageBundle;
  const permissionManager = sliderContext.permissionManager;

  const { activeEffect: activePreSlideEffect, openEffect: openPreSlideEffect } = useEffectElement(props.preSlideEffect);
  const { activeEffect: activeNextSlideEffect, openEffect: openNextSlideEffect } = useEffectElement(props.nextSlideEffect);
  const { activeEffect: activeSubmitEffect, openEffect: openSubmitEffect } = useEffectElement(props.submitEffect);

  const [isPreBtnLoading, setIsPreBtnLoading] = useState(false);
  const [isNextBtnLoading, setIsNextBtnLoading] = useState(false);
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);

  const navigation = sliderContext.navigation;

  const hasPreSlidePermission = permissionManager.getPermission(PermissionKey.PreviousSlide, true);
  const hasSubmitPermission = permissionManager.getPermission(PermissionKey.SubmitSlide, true);

  const isShowPreBtn = hasPreSlidePermission;
  const isPreBtnEnabled = navigation.activeIndex > 0;
  const isNexBtnEnabled = navigation.totalCount > 0;
  const isSubmitMode = navigation.totalCount > 0 && navigation.activeIndex === navigation.totalCount - 1;
  const isSubmitBtnEnable = hasSubmitPermission;

  const previousSlideText = i18nMessageBundle.getLocaleMessage(LocaleMessageKey.PreviousSlide);
  const nextSlideText = i18nMessageBundle.getLocaleMessage(LocaleMessageKey.NextSlide);
  const submitSlideText = i18nMessageBundle.getLocaleMessage(LocaleMessageKey.SubmitSlide);

  const onPreBtnClickHandle = useCallback(
    async () => {
      if (!props.preSlideEffect) {
        sliderContext.navigation.preSlide()
        return;
      }
      try {
        setIsPreBtnLoading(true);
        await openPreSlideEffect({
          eventName: EventNames.OnPreSlide
        });
        sliderContext.navigation.preSlide()
        setIsPreBtnLoading(false);
      } catch (err) {
        setIsPreBtnLoading(false);
      }
    },
    [openPreSlideEffect, props.preSlideEffect, sliderContext.navigation],
  )

  const onNextBtnClickHandle = useCallback(
    async () => {
      if (!props.nextSlideEffect) {
        sliderContext.navigation.nextSlide();
        return;
      }
      try {
        setIsNextBtnLoading(true);
        await openNextSlideEffect({
          eventName: EventNames.OnNextSlide
        });
        sliderContext.navigation.nextSlide();
        setIsNextBtnLoading(false);
      } catch (err) {
        setIsNextBtnLoading(false);
      }
      
      sliderContext.navigation.nextSlide();
    },
    [openNextSlideEffect, props.nextSlideEffect, sliderContext.navigation],
  )

  const onSubmitBtnClickHandle = useCallback(
    async () => {
      if (!props.submitEffect) {
        return;
      }
      try {
        setIsSubmitBtnLoading(true);
        await openSubmitEffect({
          eventName: EventNames.OnSubmitSlider
        });
        setIsSubmitBtnLoading(false);
      } catch (err) {
        setIsSubmitBtnLoading(false);
      }
    },
    [openSubmitEffect, props.submitEffect],
  ) 

  return (
    <div className={styles.main} onClick={props.onClick}>
      { isShowPreBtn && (
        <>
          <Button 
            round type="info" 
            loading={isPreBtnLoading}
            loadingText={previousSlideText}
            className={styles.preBtn} 
            disabled={!isPreBtnEnabled} 
            onClick={onPreBtnClickHandle}>
              { previousSlideText }
           </Button>
          <div className={styles.gap} />
        </>
      )}
      { !isSubmitMode ? (
        <Button 
          round 
          type="info"
          loading={isNextBtnLoading}
          loadingText={nextSlideText}
          className={styles.nextBtn} 
          disabled={!isNexBtnEnabled} 
          onClick={onNextBtnClickHandle}>
            { nextSlideText }
          </Button>
      ) : (
        <Button
          round 
          type="danger"
          loading={isSubmitBtnLoading}
          loadingText={submitSlideText}
          disabled={!isSubmitBtnEnable}
          className={styles.submitBtn} 
          onClick={onSubmitBtnClickHandle}>
            { submitSlideText }
          </Button>
      ) }
      { activePreSlideEffect }
      { activeNextSlideEffect }
      { activeSubmitEffect }
    </div>
  );
}

export default ActionBar;

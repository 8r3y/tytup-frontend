import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VideoCard from '../VideoCard.vue'

const video: AppTypes.VideoCard = {
  id: '1',
  name: 'Тестовое видео',
  url: 'https://example.com/streams/1/output.m3u8',
  duration: '12:34',
  author: 'Автор',
  views: '42',
  createdAt: 0,
  description: ''
}

describe('VideoCard', () => {
  it('renders video info', () => {
    const wrapper = mount(VideoCard, { props: { video } })
    expect(wrapper.text()).toContain('Тестовое видео')
    expect(wrapper.text()).toContain('Автор')
    expect(wrapper.text()).toContain('12:34')
  })

  it('shows preview when it is an https url', () => {
    const preview = 'https://example.com/preview.jpg'
    const wrapper = mount(VideoCard, { props: { video: { ...video, preview } } })
    expect(wrapper.find('img').attributes('src')).toBe(preview)
  })

  it('falls back to placeholder when preview is missing or not https', () => {
    const wrapper = mount(VideoCard, { props: { video: { ...video, preview: 'http://x/y.jpg' } } })
    expect(wrapper.find('img').attributes('src')).toBe('/images/no-preview-available.png')
  })
})

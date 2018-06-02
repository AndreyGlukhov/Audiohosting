from django.views.generic  import ListView, DetailView
from django.views.generic.edit import CreateView
from . import models
from django.shortcuts import render, redirect
from django.db.models import F
from django.urls import reverse


class RecordListView(ListView):
    model = models.Record

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return models.Record.objects.filter(user=self.request.user)
        else:
            return models.Record.objects.none()

    # def post(self, request, *args, **kwargs):
    #     like_pk = request.POST.get('like')
    #     dislike_pk = request.POST.get('dislike')
    #     if like_pk:
    #         models.Record.objects.filter(pk=like_pk).update(like=F('like')+1)
    #     if dislike_pk:
    #         models.Record.objects.filter(pk=dislike_pk).update(dislike=F('dislike')+1)
    #     return redirect('records:record_list')


class RecordDetailView(DetailView):
    model = models.Record


class RecordCreateView(CreateView):
    model = models.Record
    fields = ['title', 'decription', 'link', 'file']
    template_name_suffix = '_add_form'

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.instance.slug = models.Record.generate_URL()
        # print(self.request.META.get('HTTP_ORIGIN'))
        # print(reverse('records:record_list'))
        # print(form.instance.slug)
        form.instance.link_ext = "http://"+self.request.META.get('HTTP_HOST')+reverse('records:record_list')+form.instance.slug
        return super().form_valid(form)


def change_like_dislike(request, operation, pk):
    if operation == 'like':
        models.Record.objects.filter(pk=pk).update(like=F('like')+1)
    elif operation == 'dislike':
        models.Record.objects.filter(pk=pk).update(dislike=F('dislike')+1)
    return redirect('records:record_list')

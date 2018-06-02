from rest_framework.views import APIView, Response
from rest_framework import status
from django.shortcuts import HttpResponse
from records.models import Record
from .serializers import RecordSerializer


class API_Record(APIView):

    def get(self, request, slug):
        if slug == 'all':
            current_record = Record.objects.all()
            serializer = RecordSerializer(current_record, many=True)
        else:
            current_record = Record.objects.get(slug=slug)
            serializer = RecordSerializer(current_record)
        return Response(serializer.data)

    def put(self, request, slug):
        record = Record.objects.get(slug=slug)
        serializer = RecordSerializer(record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
